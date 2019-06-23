SELECT user_email FROM users
WHERE user_email = $1
RETURN users;
