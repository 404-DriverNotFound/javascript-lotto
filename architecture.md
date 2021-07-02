# 컴포넌트 구조
## 최상위 App Component
앱의 전체 상태를 보유
- 입력 받은 구입 금액
- 구매 후 남은 금액
- 자동/수동 구매
- 번호 보기 상태
- 저난 주 당첨번호

## lottoInput component
입력받은 값을 App Component로 올려주어야 함
## lottoBoard component
구매한 로또를 보여줌
- 번호보기 클릭 시 구매한 로또의 번호를 보여줌
## lottoWin component
지난 주 당첨 번호를 입력받아 App Component로 올려주어야 함
## lottoStatistic component
당첨 통계를 보여줘야 함