# brawl_dev.html → 공개용 파일 2개
#  1) brawl.html : Claude 아티팩트용. 아티팩트가 <!doctype>/<html>/<head>/<body> 뼈대를 자동으로 씌우므로 그 태그만 뺀다. (온라인 = Claude room)
#  2) ../docs/index.html : GitHub Pages 같은 일반 웹사이트용. 원본 그대로. (온라인 = PeerJS P2P 직접 연결)
import os, re
s = open('brawl_dev.html', encoding='utf-8').read()
head = re.search(r'<head>(.*?)</head>', s, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', s, re.S).group(1)
head = re.sub(r'<meta charset="utf-8">\s*', '', head)
head = re.sub(r'<meta name="viewport"[^>]*>\s*', '', head)
open('brawl.html', 'w', encoding='utf-8').write(head.strip() + '\n' + body.strip() + '\n')
os.makedirs('../docs', exist_ok=True)
# 링크 미리보기(에타·카톡·디스코드 등): 제목·설명·대표 그림(docs/og.png)
URL = 'https://isitcold07-glitch.github.io/dungi-brawl/'
DESC = '링크만 누르면 바로! 무기 9종으로 상대를 경기장 밖으로 날려라. 봇 대결 · ⚡빠른 대전 · 친구와 1:1'
og = ('<meta name="description" content="%s">\n'
      '<meta property="og:type" content="website">\n<meta property="og:title" content="흉기 남자 대난투">\n'
      '<meta property="og:description" content="%s">\n<meta property="og:url" content="%s">\n'
      '<meta property="og:image" content="%sog.png">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
      '<meta name="twitter:card" content="summary_large_image">\n<meta name="theme-color" content="#0b0710">\n') % (DESC, DESC, URL, URL)
web = s.replace('</title>', '</title>\n' + og, 1)
open('../docs/index.html', 'w', encoding='utf-8').write(web)
print('brawl.html, ../docs/index.html 생성 완료')
