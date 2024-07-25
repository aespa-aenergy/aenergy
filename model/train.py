import tensorflow as tf
import pandas as pd

# 데이터 로드 및 전처리
data = pd.read_csv('path_to_data.csv')

# 모델 정의
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1)
])

# 모델 컴파일
model.compile(optimizer='adam', loss='mse')

# 모델 학습
model.fit(data['features'], data['target'], epochs=10)

# 모델 저장
model.save('model.h5')
