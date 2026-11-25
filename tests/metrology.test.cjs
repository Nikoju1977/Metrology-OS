'use strict';
// Exercise the actual inline production functions, not a duplicate implementation.
const assert=require('node:assert/strict');
const fs=require('node:fs'), vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
function extract(start,end){const a=html.indexOf(start),b=html.indexOf(end,a);assert.ok(a>=0&&b>a,'Missing production function anchors');return html.slice(a,b);}
const sandbox={};
vm.createContext(sandbox);
vm.runInContext(extract('function numberInput(v)','function computeOpPoints()')+'\n'+extract('function uncertainty(rows,k=2)','function calcUncertainty()'),sandbox,{timeout:1000});
const {numberInput,evaluatePoint,overall,uncertainty}=sandbox;
let checks=0;
function eq(actual,expected,label){assert.equal(actual,expected,label);checks++;}
function near(actual,expected){assert.ok(Math.abs(actual-expected)<=1e-12*Math.max(1,Math.abs(expected)));checks++;}
for(const v of ['', ' ', '2mm', 'NaN', 'Infinity', null, true, '1e-400', '-1e-400', '1e309'])eq(numberInput(v),null);
eq(numberInput('0'),0);eq(numberInput('1e-3'),.001);
eq(evaluatePoint('10000000000000000','10000000000000001','0','1').error,1);
eq(evaluatePoint('0.1','0.3','0','0.2').error,.2);
eq(evaluatePoint('0.1','0.3','0','0.2').decision,'Conforme');
eq(evaluatePoint('0','0.3','0.1','0.4').decision,'Conforme');
eq(evaluatePoint('0','0.5','0.1','0.4').decision,'Zone de garde');
eq(evaluatePoint('0','0.50000000000000001','0.1','0.4').decision,'Non conforme');
eq(evaluatePoint('0','0','1e-400','1').decision,'Non évalué');
for(const args of [[0,1,'',2],[0,1,-1,2],[0,1,0,0],[0,1,0,-1],['bad',1,0,2]])eq(evaluatePoint(...args).decision,'Non évalué');
eq(overall([]),'Non évalué');eq(overall([{decision:'Conforme'},{decision:'Zone de garde'}]),'Zone de garde');
eq(overall([{decision:'Non évalué'},{decision:'Non conforme'}]),'Non conforme');
eq(overall([{decision:'Conforme'},{decision:'Non évalué'}]),'Non évalué');
eq(overall([{decision:'Conforme'}]),'Conforme');
// Independent exact integer reference in hundredths: 6,561 boundary combinations.
for(let e=-40;e<=40;e++)for(let u=0;u<=8;u++)for(let t=1;t<=9;t++){
 const expected=Math.abs(e)+u<=t?'Conforme':Math.abs(e)-u>t?'Non conforme':'Zone de garde';
 eq(evaluatePoint('0',(e/100).toFixed(2),(u/100).toFixed(2),(t/100).toFixed(2)).decision,expected);
}
const row=(value,dist='direct',sens=1,divisor=2)=>({value,dist,sens,divisor});
let x=uncertainty([row(3),row(4)],2);near(x.uc,5);near(x.U,10);
x=uncertainty([row(6,'normal'),row(4)],2);near(x.uc,5);near(x.U,10);
x=uncertainty([row(Math.sqrt(3),'rect'),row(Math.sqrt(6),'tri')],2);near(x.uc,Math.sqrt(2));near(x.U,2*Math.sqrt(2));
x=uncertainty([row(5,'direct',0),row(3,'direct',-2)],3);eq(x.terms[0],0);near(x.U,18);
for(const rows of [[],[null],[row(-1)],[row(2,'normal',1,0)],[row(2,'other')],[row(1,'direct','')],[row('1e-400')],[row(1e-300,'direct',1e-300)],[row(1e308,'direct',2)]])eq(uncertainty(rows),null);
eq(uncertainty([row(1)],0),null);eq(uncertainty([row(1)],Infinity),null);
console.log('METROLOGY PRODUCTION FUNCTIONS PASS: '+checks+' assertions; exact decimal decisions, guard bands, independent integer grid, RSS and invalid inputs.');
