---
title: "자바스크립트 개발자를 위한 Browser Storage"
description: "Unlock the Secrets of Browser Storage: A Javascript Developer’s Guide"
date: 2024-09-20
update: 2024-09-20
tags:
  - javascript
  - storage
  - sessionStorage
  - localStorage
---

브라우저 저장소. 눈에 잘 띄지 않지만 웹 애플리케이션을 위한 수많은 쿠키를 숨겨두는 웹의 비밀 보물상자와도 같습니다.

웹 개발자가 클라이언트 측에 데이터를 저장해야 하는 순간, 이러한 필수 도구만 있으면 거의 모든 것이 해결됩니다.

브라우저 저장소의 3가지

브라우저에 데이터를 저장하는 데는 각각 고유한 강점과 이상적인 사용 사례를 가진 몇 가지 주요 저장소가 있습니다:

1. Local Storage: 브라우저를 닫았다가 다시 연 후에도 내용이 지워지지 않습니다. 사용자 환경설정이나 애플리케이션의 상태를 오래 유지하거나 좋아하는 데이터를 보관하는 메커니즘을 제공하는 것을 목표로 합니다.
2. Session Storage: 일종의 메모리 보드와 같습니다. 정보가 저장되지만 브라우저 탭이나 창을 닫으면 데이터가 지워집니다. 장바구니에서 찾을 수 있는 임시 데이터나 사용자가 긴 양식의 페이지에 있는 경우 사용합니다.
3. Cookie: 쿠키는 사용자 컴퓨터에 있는 작은 텍스트 파일로, 세션을 추적하고 개인화하며 방문자를 인증하는데 도움이 될 수 있습니다.

**왜 브라우저 스토리지를 사용해야할까요?**

서버 측 옵션이 있는데 왜 굳이 브라우저 저장소를 사용해야 할까요? 몇 가지 설득력 있는 이유가 있습니다

1. 오프라인 기능: 한동안 인터넷에 연결할 수 없는 경우를 생각해보세요. 브라우저앱은 브라우저 저장소를 통해 오프라인 상태의 사용자도 원활하게 웹을 사용할 수 있도록 최소한의 기능을 제공해줄 수 있을 것입니다.
2. 서버 부하 감소: 브라우저 저장소를 사용하면 특정 데이터를 클라이언트 측에 저장하여 서버의 부담을 덜어 성능 저하와 확장성을 개선할 수 있습니다.
3. 빠른 로딩시간: 브라우저 저장소에서 데이터를 찾는 것은 서버를 여러번 호출하는 것보다 훨씬 빠릅니다. 따라서 로드 시간이 더 빨라지고 사용자 만족도가 높아집니다.

**사용법**

Local Storage:

```jsx
// Store an item
localStorage.setItem("username", "JohnDoe");

// Retrieve an item
let username = localStorage.getItem("username");

// Remove an item
localStorage.removeItem("username");

// Clear all items
localStorage.clear();
```

Session Storage:

```jsx
// Store an item
sessionStorage.setItem("cartCount", "3");

// Retrieve an item
let cartCount = sessionStorage.getItem("cartCount");

// Remove an item
sessionStorage.removeItem("cartCount");

// Clear all items
sessionStorage.clear();
```

Cookies: 쿠키를 설정하려면 document.cookie를 사용해야 합니다.

```jsx
// Setting a cookie
document.cookie =
  "userId=12345; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";

// Accessing cookies
let allCookies = document.cookie;
```

**고려사항**

- 저장 용량 제한: 브라우저 저장소에 모든 데이터를 저장하고 싶지만 local Storage와 Session Storage는 브라우저 별로 약5~10MB Cookie는 텍스트 별로 4kb의 용량제한이 있습니다.
- 데이터 보안: 클라이언트에 데이터를 저장한다는 것은 보안에 취약할 수 있습니다. 신용카드 정보와 같은 데이터는 절대 저장해선 안됩니다.
- JSON 데이터 저장: JSON.stringify() 또는 JSON.parse()를 사용하여 데이터를 쓰고 읽는 것이 중요합니다.

**결론**

브라우저 저장소는 개발자에게 더욱 풍부하고 반응성이 뛰어나며 사용자 친화적인 웹 애플리케이션을 만들 수 있는 가능성을 제공하기 때문에 자바스크립트와 가장 잘 어울리는 솔루션일 수 있습니다. 각 저장소의 장점과 단점 그리고 프로젝트의 성격을 맞추면 좋은 웹 애플리케이션을 만들 때 도움이 될 것입니다.
