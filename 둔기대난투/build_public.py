# brawl_dev.html → brawl.html (아티팩트 공개용)
# 아티팩트는 올릴 때 <!doctype>/<html>/<head>/<body> 뼈대를 자동으로 씌우므로 그 태그만 빼고 내용은 그대로 둔다.
import re
s = open('brawl_dev.html', encoding='utf-8').read()
head = re.search(r'<head>(.*?)</head>', s, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', s, re.S).group(1)
head = re.sub(r'<meta charset="utf-8">\s*', '', head)
head = re.sub(r'<meta name="viewport"[^>]*>\s*', '', head)
open('brawl.html', 'w', encoding='utf-8').write(head.strip() + '\n' + body.strip() + '\n')
print('brawl.html 생성 완료')
