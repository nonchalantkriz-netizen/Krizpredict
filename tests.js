// Minimal deterministic tests for the probability baseline (Node.js, no dependencies).
const assert=require('node:assert/strict');
function poisson(lam,k){if(lam===0)return k===0?1:0;let p=Math.exp(-lam);for(let i=1;i<=k;i++)p*=lam/i;return p}
function calculate(hFor,hAgainst,aFor,aAgainst){for(const x of [hFor,hAgainst,aFor,aAgainst])if(!Number.isFinite(x)||x<0||x>10)throw Error('invalid rate');const lh=(hFor+aAgainst)/2,la=(aFor+hAgainst)/2;let ph=0,pd=0,pa=0,over=0,btts=0,total=0;for(let i=0;i<=12;i++)for(let j=0;j<=12;j++){let p=poisson(lh,i)*poisson(la,j);total+=p;if(i>j)ph+=p;else if(i===j)pd+=p;else pa+=p;if(i+j>=3)over+=p;if(i>0&&j>0)btts+=p}return {lh,la,ph:ph/total,pd:pd/total,pa:pa/total,over:over/total,btts:btts/total}}
const r=calculate(1.6,1,1.3,1.4);
assert(Math.abs(r.ph+r.pd+r.pa-1)<1e-10,'1X2 probabilities sum to 1');
for(const k of ['ph','pd','pa','over','btts'])assert(r[k]>=0&&r[k]<=1,`${k} is a valid probability`);
const s=calculate(1.4,1.4,1.4,1.4);
assert(Math.abs(s.ph-s.pa)<1e-10,'symmetric rates produce symmetric win probabilities');
assert(Math.abs(s.pd-0.27)<0.1,'symmetric-rate draw probability is plausible');
assert.throws(()=>calculate(-1,1,1,1),/invalid rate/,'negative rates rejected');
assert.throws(()=>calculate(11,1,1,1),/invalid rate/,'rates above 10 rejected');
assert(Math.abs(calculate(0,0,0,0).pd-1)<1e-10,'zero expected goals yields draw in degenerate test');
console.log('PASS: probability normalization');
console.log('PASS: valid probability ranges');
console.log('PASS: symmetric-team symmetry');
console.log('PASS: invalid rates rejected');
console.log('PASS: zero-goal edge case');
console.log('NOTE: tests validate calculations, not real-world forecasting accuracy.');
