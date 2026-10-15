import re
d=open('hammer_dev.html').read()
s=d.replace('<title>망치 남자 (개발자용)</title>','<title>망치 남자</title>')
a=s.index('\n<div id="cheat">');b=s.index('</div>',s.index('data-c="heal"'))+len('</div>')
s=s[:a]+s[b:]
s,n1=re.subn(r'#cheat\{.*?#cheat \.row\{display:flex;gap:4px\}#cheat \.row button\{flex:1\}\n','',s,flags=re.S)
s,n3=re.subn(r'/\* ---------- 개발자 치트 ---------- \*/.*?if\(state===\'play\'&&pending>0\)openLevel\(\);\}\);\n','',s,flags=re.S)
s=s.replace("||P.god)return false;",")return false;")
assert n1==1 and n3==1 and 'cheat' not in s and 'P.god' not in s
open('hammer.html','w').write(s);print('built')
