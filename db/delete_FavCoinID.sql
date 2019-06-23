DELETE FROM favorite
WHERE bitcoinlist_id = $1
AND user_id = $2;
-- RETURNING favorite;