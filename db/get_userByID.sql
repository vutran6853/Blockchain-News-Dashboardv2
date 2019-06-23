SELECT  user_firstname, 
        user_lastname,
        user_email,
        user_url 
FROM users
WHERE user_id = $1