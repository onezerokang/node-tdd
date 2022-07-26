# TDD

TDD는 Test Driven Development의 약자로 번역하면 테스트 주도 개발이다.
TDD를 해야 하는 이유는 다음과 같다.

1. 블라 블라
2. 블라 블라
3. 블라 블라

## 단위 테스트

소스 코드의 개별 단위를 테스트하여 사용할 준비가 되었는지 확인하는 테스트 방법. 개발 라이프 사이클 초기 단계에서 버그가 식별되므로 디버깅 시간과 수정 비용을 줄이는데 도움이 된다. 메서드를 테스트하는 또 다른 메서드.

### 단위 테스트의 조건

1. 독립적이어야 한다. 다른 테스트에 의존하면 안된다.
2. 격리 되어야 한다. Ajax, Axios, LocalStorage 등 테스트 대상이 의존하는 것을 다른 것으로 대체해야 한다.

### 단위 테스트를 하는 이유

1. 프로그램이 크고, 메모리가 많이 들고, 다른 리소스가 필요한 경우 로컬환경에서 쉽게 코드를 실행시켜보기 어렵다. 이런 프로그램을 개발하는 개발자들은 유닛 테스트를 만들어 빠르게 자신의 코드가 정상적으로 작동하는지 확인 할 수 있다.
2. 종속성이 있는 다른 클래스에 버그가 발생하는 것을 방지하기 위함

## JEST

페이스북에 의해 만들어진 테스팅 프레임워크로 단위 테스트를 할 떄 사용한다.

## jest.fn()

Mock 함수를 생성하는 함수. 단위 테스트를 작성할 때 해당 코드가 의존하는 부분을 가짜로 대체하는 일을 한다.

### 단위 테스트는 왜 독립적이어야 하나요?

의존적인 부분을 구현하기 까다로울 수 있다. 의존적인 부분의 상태에 따라서 테스트하고자 하는 부분의 테스트 결과가 영향을 받을 수 있기 때문이다.

#### 예를 들어서

데이터베이스에 데이터를 저장하는 부분을 테스트를 한다면...
테스트를 전송하는 가운데 Network, I/O작업, 트랜잭션 생성, 쿼리 전송 등 많은 것에 영항을 받는다.
테스트 이후 데이터를 원복하거나 트랜잭션 rollback 해야 한다.
하나 테스트하는데 너무 많은 것들이 따라온다.(비효율적)
또 테스트 중 DB가 죽어버리면 영향을 준다.

단위테스트는 특정 기능만 분리하여 독립적으로 사용해야 한다.
jest.fn()으로 Mock 함수를 생성하여 해결할 수 있다.