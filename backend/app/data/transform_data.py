import json

# JSON 데이터 읽기
with open('backend/app/data/winter.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 변환된 데이터를 저장할 딕셔너리 초기화
transformed_data = {}

# 기존 데이터를 날짜별로 변환
for region, dates in data.items():
    for date, value in dates.items():
        if date not in transformed_data:
            transformed_data[date] = {}
        transformed_data[date][region] = value

# 변환된 데이터 저장
with open('backend/app/data/transformed_winter.json', 'w', encoding='utf-8') as file:
    json.dump(transformed_data, file, ensure_ascii=False, indent=4)

print("데이터 변환이 완료되었습니다.")