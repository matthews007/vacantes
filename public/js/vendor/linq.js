!function(){"use strict";function n(){function n(){var n=function(n){this.GetEnumerator=n};n.Choice=function(){var e=arguments[0]instanceof Array?arguments[0]:arguments;return new n(function(){return new i(t.Blank,function(){return this.Yield(e[Math.floor(Math.random()*e.length)])},t.Blank)})},n.Cycle=function(){var e=arguments[0]instanceof Array?arguments[0]:arguments;return new n(function(){var n=0;return new i(t.Blank,function(){return n>=e.length&&(n=0),this.Yield(e[n++])},t.Blank)})},n.Empty=function(){return new n(function(){return new i(t.Blank,function(){return!1},t.Blank)})},n.From=function(u){if(null==u)return n.Empty();if(u instanceof n)return u;if(typeof u==e.Number||typeof u==e.Boolean)return n.Repeat(u,1);if(typeof u==e.String)return new n(function(){var n=0;return new i(t.Blank,function(){return n<u.length?this.Yield(u.charAt(n++)):!1},t.Blank)});if(typeof u!=e.Function){if(typeof u.length==e.Number)return new s(u);if(!(u instanceof Object)&&r.IsIEnumerable(u))return new n(function(){var n,e=!0;return new i(function(){n=new Enumerator(u)},function(){return e?e=!1:n.moveNext(),n.atEnd()?!1:this.Yield(n.item())},t.Blank)})}return new n(function(){var n=[],e=0;return new i(function(){for(var t in u)u[t]instanceof Function||n.push({Key:t,Value:u[t]})},function(){return e<n.length?this.Yield(n[e++]):!1},t.Blank)})},n.Return=function(t){return n.Repeat(t,1)},n.Matches=function(e,r,u){return null==u&&(u=""),r instanceof RegExp&&(u+=r.ignoreCase?"i":"",u+=r.multiline?"m":"",r=r.source),-1===u.indexOf("g")&&(u+="g"),new n(function(){var n;return new i(function(){n=new RegExp(r,u)},function(){var t=n.exec(e);return t?this.Yield(t):!1},t.Blank)})},n.Range=function(t,e,r){return null==r&&(r=1),n.ToInfinity(t,r).Take(e)},n.RangeDown=function(t,e,r){return null==r&&(r=1),n.ToNegativeInfinity(t,r).Take(e)},n.RangeTo=function(t,e,r){return null==r&&(r=1),e>t?n.ToInfinity(t,r).TakeWhile(function(n){return e>=n}):n.ToNegativeInfinity(t,r).TakeWhile(function(n){return n>=e})},n.Repeat=function(e,r){return null!=r?n.Repeat(e).Take(r):new n(function(){return new i(t.Blank,function(){return this.Yield(e)},t.Blank)})},n.RepeatWithFinalize=function(t,e){return t=r.CreateLambda(t),e=r.CreateLambda(e),new n(function(){var n;return new i(function(){n=t()},function(){return this.Yield(n)},function(){null!=n&&(e(n),n=null)})})},n.Generate=function(e,u){return null!=u?n.Generate(e).Take(u):(e=r.CreateLambda(e),new n(function(){return new i(t.Blank,function(){return this.Yield(e())},t.Blank)}))},n.ToInfinity=function(e,r){return null==e&&(e=0),null==r&&(r=1),new n(function(){var n;return new i(function(){n=e-r},function(){return this.Yield(n+=r)},t.Blank)})},n.ToNegativeInfinity=function(e,r){return null==e&&(e=0),null==r&&(r=1),new n(function(){var n;return new i(function(){n=e+r},function(){return this.Yield(n-=r)},t.Blank)})},n.Unfold=function(e,u){return u=r.CreateLambda(u),new n(function(){var n,r=!0;return new i(t.Blank,function(){return r?(r=!1,n=e,this.Yield(n)):(n=u(n),this.Yield(n))},t.Blank)})},n.prototype={CascadeBreadthFirst:function(t,e){var u=this;return t=r.CreateLambda(t),e=r.CreateLambda(e),new n(function(){var o,a=0,c=[];return new i(function(){o=u.GetEnumerator()},function(){for(;;){if(o.MoveNext())return c.push(o.Current()),this.Yield(e(o.Current(),a));var u=n.From(c).SelectMany(function(n){return t(n)});if(!u.Any())return!1;a++,c=[],r.Dispose(o),o=u.GetEnumerator()}},function(){r.Dispose(o)})})},CascadeDepthFirst:function(t,e){var u=this;return t=r.CreateLambda(t),e=r.CreateLambda(e),new n(function(){var o,a=[];return new i(function(){o=u.GetEnumerator()},function(){for(;;){if(o.MoveNext()){var u=e(o.Current(),a.length);return a.push(o),o=n.From(t(o.Current())).GetEnumerator(),this.Yield(u)}if(a.length<=0)return!1;r.Dispose(o),o=a.pop()}},function(){try{r.Dispose(o)}finally{n.From(a).ForEach(function(n){n.Dispose()})}})})},Flatten:function(){var e=this;return new n(function(){var u,o=null;return new i(function(){u=e.GetEnumerator()},function(){for(;;){if(null!=o){if(o.MoveNext())return this.Yield(o.Current());o=null}if(u.MoveNext()){if(u.Current()instanceof Array){r.Dispose(o),o=n.From(u.Current()).SelectMany(t.Identity).Flatten().GetEnumerator();continue}return this.Yield(u.Current())}return!1}},function(){try{r.Dispose(u)}finally{r.Dispose(o)}})})},Pairwise:function(t){var e=this;return t=r.CreateLambda(t),new n(function(){var n;return new i(function(){n=e.GetEnumerator(),n.MoveNext()},function(){var e=n.Current();return n.MoveNext()?this.Yield(t(e,n.Current())):!1},function(){r.Dispose(n)})})},Scan:function(t,e,u){if(null!=u)return this.Scan(t,e).Select(u);var o;null==e?(e=r.CreateLambda(t),o=!1):(e=r.CreateLambda(e),o=!0);var a=this;return new n(function(){var n,u,c=!0;return new i(function(){n=a.GetEnumerator()},function(){if(c){if(c=!1,o)return this.Yield(u=t);if(n.MoveNext())return this.Yield(u=n.Current())}return n.MoveNext()?this.Yield(u=e(u,n.Current())):!1},function(){r.Dispose(n)})})},Select:function(t){var e=this;return t=r.CreateLambda(t),new n(function(){var n,u=0;return new i(function(){n=e.GetEnumerator()},function(){return n.MoveNext()?this.Yield(t(n.Current(),u++)):!1},function(){r.Dispose(n)})})},SelectMany:function(t,e){var u=this;return t=r.CreateLambda(t),null==e&&(e=function(n,t){return t}),e=r.CreateLambda(e),new n(function(){var o,a=void 0,c=0;return new i(function(){o=u.GetEnumerator()},function(){if(void 0===a&&!o.MoveNext())return!1;do{if(null==a){var u=t(o.Current(),c++);a=n.From(u).GetEnumerator()}if(a.MoveNext())return this.Yield(e(o.Current(),a.Current()));r.Dispose(a),a=null}while(o.MoveNext());return!1},function(){try{r.Dispose(o)}finally{r.Dispose(a)}})})},Where:function(t){t=r.CreateLambda(t);var e=this;return new n(function(){var n,u=0;return new i(function(){n=e.GetEnumerator()},function(){for(;n.MoveNext();)if(t(n.Current(),u++))return this.Yield(n.Current());return!1},function(){r.Dispose(n)})})},OfType:function(n){var t;switch(n){case Number:t=e.Number;break;case String:t=e.String;break;case Boolean:t=e.Boolean;break;case Function:t=e.Function;break;default:t=null}return this.Where(null===t?function(t){return t instanceof n}:function(n){return typeof n===t})},Zip:function(t,e){e=r.CreateLambda(e);var u=this;return new n(function(){var o,a,c=0;return new i(function(){o=u.GetEnumerator(),a=n.From(t).GetEnumerator()},function(){return o.MoveNext()&&a.MoveNext()?this.Yield(e(o.Current(),a.Current(),c++)):!1},function(){try{r.Dispose(o)}finally{r.Dispose(a)}})})},Join:function(e,u,o,a,c){u=r.CreateLambda(u),o=r.CreateLambda(o),a=r.CreateLambda(a),c=r.CreateLambda(c);var s=this;return new n(function(){var f,l,h=null,v=0;return new i(function(){f=s.GetEnumerator(),l=n.From(e).ToLookup(o,t.Identity,c)},function(){for(;;){if(null!=h){var n=h[v++];if(void 0!==n)return this.Yield(a(f.Current(),n));n=null,v=0}if(!f.MoveNext())return!1;var t=u(f.Current());h=l.Get(t).ToArray()}},function(){r.Dispose(f)})})},GroupJoin:function(e,u,o,a,c){u=r.CreateLambda(u),o=r.CreateLambda(o),a=r.CreateLambda(a),c=r.CreateLambda(c);var s=this;return new n(function(){var f=s.GetEnumerator(),l=null;return new i(function(){f=s.GetEnumerator(),l=n.From(e).ToLookup(o,t.Identity,c)},function(){if(f.MoveNext()){var n=l.Get(u(f.Current()));return this.Yield(a(f.Current(),n))}return!1},function(){r.Dispose(f)})})},All:function(n){n=r.CreateLambda(n);var t=!0;return this.ForEach(function(e){return n(e)?void 0:(t=!1,!1)}),t},Any:function(n){n=r.CreateLambda(n);var t=this.GetEnumerator();try{if(0==arguments.length)return t.MoveNext();for(;t.MoveNext();)if(n(t.Current()))return!0;return!1}finally{r.Dispose(t)}},Concat:function(t){var e=this;return new n(function(){var u,o;return new i(function(){u=e.GetEnumerator()},function(){if(null==o){if(u.MoveNext())return this.Yield(u.Current());o=n.From(t).GetEnumerator()}return o.MoveNext()?this.Yield(o.Current()):!1},function(){try{r.Dispose(u)}finally{r.Dispose(o)}})})},Insert:function(t,e){var u=this;return new n(function(){var o,a,c=0,s=!1;return new i(function(){o=u.GetEnumerator(),a=n.From(e).GetEnumerator()},function(){return c==t&&a.MoveNext()?(s=!0,this.Yield(a.Current())):o.MoveNext()?(c++,this.Yield(o.Current())):!s&&a.MoveNext()?this.Yield(a.Current()):!1},function(){try{r.Dispose(o)}finally{r.Dispose(a)}})})},Alternate:function(t){return t=n.Return(t),this.SelectMany(function(e){return n.Return(e).Concat(t)}).TakeExceptLast()},Contains:function(n,t){t=r.CreateLambda(t);var e=this.GetEnumerator();try{for(;e.MoveNext();)if(t(e.Current())===n)return!0;return!1}finally{r.Dispose(e)}},DefaultIfEmpty:function(t){var e=this;return new n(function(){var n,u=!0;return new i(function(){n=e.GetEnumerator()},function(){return n.MoveNext()?(u=!1,this.Yield(n.Current())):u?(u=!1,this.Yield(t)):!1},function(){r.Dispose(n)})})},Distinct:function(t){return this.Except(n.Empty(),t)},Except:function(t,e){e=r.CreateLambda(e);var u=this;return new n(function(){var o,a;return new i(function(){o=u.GetEnumerator(),a=new f(e),n.From(t).ForEach(function(n){a.Add(n)})},function(){for(;o.MoveNext();){var n=o.Current();if(!a.Contains(n))return a.Add(n),this.Yield(n)}return!1},function(){r.Dispose(o)})})},Intersect:function(t,e){e=r.CreateLambda(e);var u=this;return new n(function(){var o,a,c;return new i(function(){o=u.GetEnumerator(),a=new f(e),n.From(t).ForEach(function(n){a.Add(n)}),c=new f(e)},function(){for(;o.MoveNext();){var n=o.Current();if(!c.Contains(n)&&a.Contains(n))return c.Add(n),this.Yield(n)}return!1},function(){r.Dispose(o)})})},SequenceEqual:function(t,e){e=r.CreateLambda(e);var u=this.GetEnumerator();try{var i=n.From(t).GetEnumerator();try{for(;u.MoveNext();)if(!i.MoveNext()||e(u.Current())!==e(i.Current()))return!1;return i.MoveNext()?!1:!0}finally{r.Dispose(i)}}finally{r.Dispose(u)}},Union:function(t,e){e=r.CreateLambda(e);var u=this;return new n(function(){var o,a,c;return new i(function(){o=u.GetEnumerator(),c=new f(e)},function(){var e;if(void 0===a){for(;o.MoveNext();)if(e=o.Current(),!c.Contains(e))return c.Add(e),this.Yield(e);a=n.From(t).GetEnumerator()}for(;a.MoveNext();)if(e=a.Current(),!c.Contains(e))return c.Add(e),this.Yield(e);return!1},function(){try{r.Dispose(o)}finally{r.Dispose(a)}})})},OrderBy:function(n){return new a(this,n,!1)},OrderByDescending:function(n){return new a(this,n,!0)},Reverse:function(){var e=this;return new n(function(){var n,r;return new i(function(){n=e.ToArray(),r=n.length},function(){return r>0?this.Yield(n[--r]):!1},t.Blank)})},Shuffle:function(){var e=this;return new n(function(){var n;return new i(function(){n=e.ToArray()},function(){if(n.length>0){var t=Math.floor(Math.random()*n.length);return this.Yield(n.splice(t,1)[0])}return!1},t.Blank)})},GroupBy:function(t,e,u,o){var a=this;return t=r.CreateLambda(t),e=r.CreateLambda(e),null!=u&&(u=r.CreateLambda(u)),o=r.CreateLambda(o),new n(function(){var n;return new i(function(){n=a.ToLookup(t,e,o).ToEnumerable().GetEnumerator()},function(){for(;n.MoveNext();)return this.Yield(null==u?n.Current():u(n.Current().Key(),n.Current()));return!1},function(){r.Dispose(n)})})},PartitionBy:function(t,e,u,o){var a=this;t=r.CreateLambda(t),e=r.CreateLambda(e),o=r.CreateLambda(o);var c;return null==u?(c=!1,u=function(n,t){return new h(n,t)}):(c=!0,u=r.CreateLambda(u)),new n(function(){var s,f,l,h=[];return new i(function(){s=a.GetEnumerator(),s.MoveNext()&&(f=t(s.Current()),l=o(f),h.push(e(s.Current())))},function(){for(var r;1==(r=s.MoveNext())&&l===o(t(s.Current()));)h.push(e(s.Current()));if(h.length>0){var i=c?u(f,n.From(h)):u(f,h);return r?(f=t(s.Current()),l=o(f),h=[e(s.Current())]):h=[],this.Yield(i)}return!1},function(){r.Dispose(s)})})},BufferWithCount:function(t){var e=this;return new n(function(){var n;return new i(function(){n=e.GetEnumerator()},function(){for(var e=[],r=0;n.MoveNext();)if(e.push(n.Current()),++r>=t)return this.Yield(e);return e.length>0?this.Yield(e):!1},function(){r.Dispose(n)})})},Aggregate:function(n,t,e){return this.Scan(n,t,e).Last()},Average:function(n){n=r.CreateLambda(n);var t=0,e=0;return this.ForEach(function(r){t+=n(r),++e}),t/e},Count:function(n){n=null==n?t.True:r.CreateLambda(n);var e=0;return this.ForEach(function(t,r){n(t,r)&&++e}),e},Max:function(n){return null==n&&(n=t.Identity),this.Select(n).Aggregate(function(n,t){return n>t?n:t})},Min:function(n){return null==n&&(n=t.Identity),this.Select(n).Aggregate(function(n,t){return t>n?n:t})},MaxBy:function(n){return n=r.CreateLambda(n),this.Aggregate(function(t,e){return n(t)>n(e)?t:e})},MinBy:function(n){return n=r.CreateLambda(n),this.Aggregate(function(t,e){return n(t)<n(e)?t:e})},Sum:function(n){return null==n&&(n=t.Identity),this.Select(n).Aggregate(0,function(n,t){return n+t})},ElementAt:function(n){var t,e=!1;if(this.ForEach(function(r,u){return u==n?(t=r,e=!0,!1):void 0}),!e)throw new Error("index is less than 0 or greater than or equal to the number of elements in source.");return t},ElementAtOrDefault:function(n,t){var e,r=!1;return this.ForEach(function(t,u){return u==n?(e=t,r=!0,!1):void 0}),r?e:t},First:function(n){if(null!=n)return this.Where(n).First();var t,e=!1;if(this.ForEach(function(n){return t=n,e=!0,!1}),!e)throw new Error("First:No element satisfies the condition.");return t},FirstOrDefault:function(n,t){if(null!=t)return this.Where(t).FirstOrDefault(n);var e,r=!1;return this.ForEach(function(n){return e=n,r=!0,!1}),r?e:n},Last:function(n){if(null!=n)return this.Where(n).Last();var t,e=!1;if(this.ForEach(function(n){e=!0,t=n}),!e)throw new Error("Last:No element satisfies the condition.");return t},LastOrDefault:function(n,t){if(null!=t)return this.Where(t).LastOrDefault(n);var e,r=!1;return this.ForEach(function(n){r=!0,e=n}),r?e:n},Single:function(n){if(null!=n)return this.Where(n).Single();var t,e=!1;if(this.ForEach(function(n){if(e)throw new Error("Single:sequence contains more than one element.");e=!0,t=n}),!e)throw new Error("Single:No element satisfies the condition.");return t},SingleOrDefault:function(n,t){if(null!=t)return this.Where(t).SingleOrDefault(n);var e,r=!1;return this.ForEach(function(n){if(r)throw new Error("Single:sequence contains more than one element.");r=!0,e=n}),r?e:n},Skip:function(t){var e=this;return new n(function(){var n,u=0;return new i(function(){for(n=e.GetEnumerator();u++<t&&n.MoveNext(););},function(){return n.MoveNext()?this.Yield(n.Current()):!1},function(){r.Dispose(n)})})},SkipWhile:function(t){t=r.CreateLambda(t);var e=this;return new n(function(){var n,u=0,o=!1;return new i(function(){n=e.GetEnumerator()},function(){for(;!o;){if(!n.MoveNext())return!1;if(!t(n.Current(),u++))return o=!0,this.Yield(n.Current())}return n.MoveNext()?this.Yield(n.Current()):!1},function(){r.Dispose(n)})})},Take:function(t){var e=this;return new n(function(){var n,u=0;return new i(function(){n=e.GetEnumerator()},function(){return u++<t&&n.MoveNext()?this.Yield(n.Current()):!1},function(){r.Dispose(n)})})},TakeWhile:function(t){t=r.CreateLambda(t);var e=this;return new n(function(){var n,u=0;return new i(function(){n=e.GetEnumerator()},function(){return n.MoveNext()&&t(n.Current(),u++)?this.Yield(n.Current()):!1},function(){r.Dispose(n)})})},TakeExceptLast:function(t){null==t&&(t=1);var e=this;return new n(function(){if(0>=t)return e.GetEnumerator();var n,u=[];return new i(function(){n=e.GetEnumerator()},function(){for(;n.MoveNext();){if(u.length==t)return u.push(n.Current()),this.Yield(u.shift());u.push(n.Current())}return!1},function(){r.Dispose(n)})})},TakeFromLast:function(t){if(0>=t||null==t)return n.Empty();var e=this;return new n(function(){var u,o,a=[];return new i(function(){u=e.GetEnumerator()},function(){for(;u.MoveNext();)a.length==t&&a.shift(),a.push(u.Current());return null==o&&(o=n.From(a).GetEnumerator()),o.MoveNext()?this.Yield(o.Current()):!1},function(){r.Dispose(o)})})},IndexOf:function(n){var t=null;return this.ForEach(function(e,r){return e===n?(t=r,!0):void 0}),null!==t?t:-1},LastIndexOf:function(n){var t=-1;return this.ForEach(function(e,r){e===n&&(t=r)}),t},ToArray:function(){var n=[];return this.ForEach(function(t){n.push(t)}),n},ToLookup:function(n,t,e){n=r.CreateLambda(n),t=r.CreateLambda(t),e=r.CreateLambda(e);var u=new f(e);return this.ForEach(function(e){var r=n(e),i=t(e),o=u.Get(r);void 0!==o?o.push(i):u.Add(r,[i])}),new l(u)},ToObject:function(n,t){n=r.CreateLambda(n),t=r.CreateLambda(t);var e={};return this.ForEach(function(r){e[n(r)]=t(r)}),e},ToDictionary:function(n,t,e){n=r.CreateLambda(n),t=r.CreateLambda(t),e=r.CreateLambda(e);var u=new f(e);return this.ForEach(function(e){u.Add(n(e),t(e))}),u},ToJSON:function(n,t){return JSON.stringify(this.ToArray(),n,t)},ToString:function(n,e){return null==n&&(n=""),null==e&&(e=t.Identity),this.Select(e).ToArray().join(n)},Do:function(t){var e=this;return t=r.CreateLambda(t),new n(function(){var n,u=0;return new i(function(){n=e.GetEnumerator()},function(){return n.MoveNext()?(t(n.Current(),u++),this.Yield(n.Current())):!1},function(){r.Dispose(n)})})},ForEach:function(n){n=r.CreateLambda(n);var t=0,e=this.GetEnumerator();try{for(;e.MoveNext()&&n(e.Current(),t++)!==!1;);}finally{r.Dispose(e)}},Write:function(n,t){null==n&&(n=""),t=r.CreateLambda(t);var e=!0;this.ForEach(function(r){e?e=!1:document.write(n),document.write(t(r))})},WriteLine:function(n){n=r.CreateLambda(n),this.ForEach(function(t){document.write(n(t)),document.write("<br />")})},Force:function(){var n=this.GetEnumerator();try{for(;n.MoveNext(););}finally{r.Dispose(n)}},Let:function(t){t=r.CreateLambda(t);var e=this;return new n(function(){var u;return new i(function(){u=n.From(t(e)).GetEnumerator()},function(){return u.MoveNext()?this.Yield(u.Current()):!1},function(){r.Dispose(u)})})},Share:function(){var e,r=this;return new n(function(){return new i(function(){null==e&&(e=r.GetEnumerator())},function(){return e.MoveNext()?this.Yield(e.Current()):!1},t.Blank)})},MemoizeAll:function(){var e,r,u=this;return new n(function(){var n=-1;return new i(function(){null==r&&(r=u.GetEnumerator(),e=[])},function(){return n++,e.length<=n?r.MoveNext()?this.Yield(e[n]=r.Current()):!1:this.Yield(e[n])},t.Blank)})},Catch:function(t){t=r.CreateLambda(t);var e=this;return new n(function(){var n;return new i(function(){n=e.GetEnumerator()},function(){try{return n.MoveNext()?this.Yield(n.Current()):!1}catch(e){return t(e),!1}},function(){r.Dispose(n)})})},Finally:function(t){t=r.CreateLambda(t);var e=this;return new n(function(){var n;return new i(function(){n=e.GetEnumerator()},function(){return n.MoveNext()?this.Yield(n.Current()):!1},function(){try{r.Dispose(n)}finally{t()}})})},Trace:function(n,t){return null==n&&(n="Trace"),t=r.CreateLambda(t),this.Do(function(e){console.log(n,":",t(e))})}};var t={Identity:function(n){return n},True:function(){return!0},Blank:function(){}},e={Boolean:typeof!0,Number:"number",String:"string",Object:typeof{},Undefined:"undefined",Function:"function"},r={CreateLambda:function(n){if(null==n)return t.Identity;if(typeof n==e.String){if(""==n)return t.Identity;if(-1==n.indexOf("=>"))return new Function("$,$$,$$$,$$$$","return "+n);var r=n.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);return new Function(r[1],"return "+r[2])}return n},IsIEnumerable:function(n){if(typeof Enumerator!=e.Undefined)try{return new Enumerator(n),!0}catch(t){}return!1},Compare:function(n,t){return n===t?0:n>t?1:-1},Dispose:function(n){null!=n&&n.Dispose()}},u={Before:0,Running:1,After:2},i=function(n,t,e){var r=new o,i=u.Before;this.Current=r.Current,this.MoveNext=function(){try{switch(i){case u.Before:i=u.Running,n();case u.Running:return t.apply(r)?!0:(this.Dispose(),!1);case u.After:return!1}}catch(e){throw this.Dispose(),e}},this.Dispose=function(){if(i==u.Running)try{e()}finally{i=u.After}}},o=function(){var n=null;this.Current=function(){return n},this.Yield=function(t){return n=t,!0}},a=function(n,t,e,u){this.source=n,this.keySelector=r.CreateLambda(t),this.descending=e,this.parent=u};a.prototype=new n,a.prototype.CreateOrderedEnumerable=function(n,t){return new a(this.source,n,t,this)},a.prototype.ThenBy=function(n){return this.CreateOrderedEnumerable(n,!1)},a.prototype.ThenByDescending=function(n){return this.CreateOrderedEnumerable(n,!0)},a.prototype.GetEnumerator=function(){var n,e,r=this,u=0;return new i(function(){n=[],e=[],r.source.ForEach(function(t,r){n.push(t),e.push(r)});var t=c.Create(r,null);t.GenerateKeys(n),e.sort(function(n,e){return t.Compare(n,e)})},function(){return u<e.length?this.Yield(n[e[u++]]):!1},t.Blank)};var c=function(n,t,e){this.keySelector=n,this.descending=t,this.child=e,this.keys=null};c.Create=function(n,t){var e=new c(n.keySelector,n.descending,t);return null!=n.parent?c.Create(n.parent,e):e},c.prototype.GenerateKeys=function(n){for(var t=n.length,e=this.keySelector,r=new Array(t),u=0;t>u;u++)r[u]=e(n[u]);this.keys=r,null!=this.child&&this.child.GenerateKeys(n)},c.prototype.Compare=function(n,t){var e=r.Compare(this.keys[n],this.keys[t]);if(0==e){if(null!=this.child)return this.child.Compare(n,t);e=r.Compare(n,t)}return this.descending?-e:e};var s=function(n){this.source=n};s.prototype=new n,s.prototype.Any=function(t){return null==t?this.source.length>0:n.prototype.Any.apply(this,arguments)},s.prototype.Count=function(t){return null==t?this.source.length:n.prototype.Count.apply(this,arguments)},s.prototype.ElementAt=function(t){return t>=0&&t<this.source.length?this.source[t]:n.prototype.ElementAt.apply(this,arguments)},s.prototype.ElementAtOrDefault=function(n,t){return n>=0&&n<this.source.length?this.source[n]:t},s.prototype.First=function(t){return null==t&&this.source.length>0?this.source[0]:n.prototype.First.apply(this,arguments)},s.prototype.FirstOrDefault=function(t,e){return null!=e?n.prototype.FirstOrDefault.apply(this,arguments):this.source.length>0?this.source[0]:t},s.prototype.Last=function(t){return null==t&&this.source.length>0?this.source[this.source.length-1]:n.prototype.Last.apply(this,arguments)},s.prototype.LastOrDefault=function(t,e){return null!=e?n.prototype.LastOrDefault.apply(this,arguments):this.source.length>0?this.source[this.source.length-1]:t},s.prototype.Skip=function(e){var r=this.source;return new n(function(){var n;return new i(function(){n=0>e?0:e},function(){return n<r.length?this.Yield(r[n++]):!1},t.Blank)})},s.prototype.TakeExceptLast=function(n){return null==n&&(n=1),this.Take(this.source.length-n)},s.prototype.TakeFromLast=function(n){return this.Skip(this.source.length-n)},s.prototype.Reverse=function(){var e=this.source;return new n(function(){var n;return new i(function(){n=e.length},function(){return n>0?this.Yield(e[--n]):!1},t.Blank)})},s.prototype.SequenceEqual=function(t,e){return(t instanceof s||t instanceof Array)&&null==e&&n.From(t).Count()!=this.Count()?!1:n.prototype.SequenceEqual.apply(this,arguments)},s.prototype.ToString=function(t,e){return null==e&&this.source instanceof Array?(null==t&&(t=""),this.source.join(t)):n.prototype.ToString.apply(this,arguments)},s.prototype.GetEnumerator=function(){var n=this.source,e=0;return new i(t.Blank,function(){return e<n.length?this.Yield(n[e++]):!1},t.Blank)};var f=function(){var r=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},u=function(n){return null===n?"null":void 0===n?"undefined":typeof n.toString===e.Function?n.toString():Object.prototype.toString.call(n)},o=function(n,t){this.Key=n,this.Value=t,this.Prev=null,this.Next=null},a=function(){this.First=null,this.Last=null};a.prototype={AddLast:function(n){null!=this.Last?(this.Last.Next=n,n.Prev=this.Last,this.Last=n):this.First=this.Last=n},Replace:function(n,t){null!=n.Prev?(n.Prev.Next=t,t.Prev=n.Prev):this.First=t,null!=n.Next?(n.Next.Prev=t,t.Next=n.Next):this.Last=t},Remove:function(n){null!=n.Prev?n.Prev.Next=n.Next:this.First=n.Next,null!=n.Next?n.Next.Prev=n.Prev:this.Last=n.Prev}};var c=function(n){this.count=0,this.entryList=new a,this.buckets={},this.compareSelector=null==n?t.Identity:n};return c.prototype={Add:function(n,t){var e=this.compareSelector(n),i=u(e),a=new o(n,t);if(r(this.buckets,i)){for(var c=this.buckets[i],s=0;s<c.length;s++)if(this.compareSelector(c[s].Key)===e)return this.entryList.Replace(c[s],a),void(c[s]=a);c.push(a)}else this.buckets[i]=[a];this.count++,this.entryList.AddLast(a)},Get:function(n){var t=this.compareSelector(n),e=u(t);if(!r(this.buckets,e))return void 0;for(var i=this.buckets[e],o=0;o<i.length;o++){var a=i[o];if(this.compareSelector(a.Key)===t)return a.Value}return void 0},Set:function(n,t){var e=this.compareSelector(n),i=u(e);if(r(this.buckets,i))for(var a=this.buckets[i],c=0;c<a.length;c++)if(this.compareSelector(a[c].Key)===e){var s=new o(n,t);return this.entryList.Replace(a[c],s),a[c]=s,!0}return!1},Contains:function(n){var t=this.compareSelector(n),e=u(t);if(!r(this.buckets,e))return!1;for(var i=this.buckets[e],o=0;o<i.length;o++)if(this.compareSelector(i[o].Key)===t)return!0;return!1},Clear:function(){this.count=0,this.buckets={},this.entryList=new a},Remove:function(n){var t=this.compareSelector(n),e=u(t);if(r(this.buckets,e))for(var i=this.buckets[e],o=0;o<i.length;o++)if(this.compareSelector(i[o].Key)===t)return this.entryList.Remove(i[o]),i.splice(o,1),0==i.length&&delete this.buckets[e],void this.count--},Count:function(){return this.count},ToEnumerable:function(){var e=this;return new n(function(){var n;return new i(function(){n=e.entryList.First},function(){if(null!=n){var t={Key:n.Key,Value:n.Value};return n=n.Next,this.Yield(t)}return!1},t.Blank)})}},c}(),l=function(t){this.Count=function(){return t.Count()},this.Get=function(e){return n.From(t.Get(e))},this.Contains=function(n){return t.Contains(n)},this.ToEnumerable=function(){return t.ToEnumerable().Select(function(n){return new h(n.Key,n.Value)})}},h=function(n,t){this.Key=function(){return n},s.call(this,t)};return h.prototype=new s,n}return{Enumerable:n}}angular.module("angular-linq").factory("$linq",n)}();