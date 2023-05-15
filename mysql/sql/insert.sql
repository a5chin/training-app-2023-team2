INSERT INTO hello_worlds (lang, message) VALUES ('en', 'Hello World');
INSERT INTO hello_worlds (lang, message) VALUES ('ja', 'こんにちは 世界');

INSERT INTO users (id, name, email, password) VALUES ('01H0F7PC287Q3C2XH9C575F9ZW', 'taro', 'taro@gmail.com', 'password');
INSERT INTO users (id, name, email, password) VALUES ('01H0F7PC2AXHE7DRHPKV8Y4SZC', 'hanako', 'hanako@gmail.com', 'PASSWORD');

INSERT INTO posts (id, user_id, body) VALUES ('01H0F7PC2AJBPZJH73Q0EBM45H', '01H0F7PC287Q3C2XH9C575F9ZW', '質問1\n改行');
INSERT INTO posts (id, user_id, parent_id, body) VALUES ('01H0F7PC2AAMZNXD6HWD7D0SP9', '01H0F7PC287Q3C2XH9C575F9ZW', '01H0F7PC2AJBPZJH73Q0EBM45H', '質問2\n改行');
