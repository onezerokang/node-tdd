// describe안에 테스트 케이스(it)를 넣는다.
// describe: 여러 관련 테스트를 그룹화 하는 블록
// it: 개별 테스트를 수행하는 곳, 각 테스트르 작은 문장처럼 설명한다.
// expect: 값을 테스트할 때마다 사용한다. expect 함수는 혼자서는 거의 사용되지 않으며 matcher와 함꼐 사용한다.
// matcher: 다른 방법으로 값을 테스트 "매처"를 사용합니다.

describe("Calculation", () => {
  test("two + two is four", () => {
    expect(2 + 2).toBe(4);
  });

  test("two plus two is not five", () => {
    expect(2 + 2).not.toBe(5);
  });
});
