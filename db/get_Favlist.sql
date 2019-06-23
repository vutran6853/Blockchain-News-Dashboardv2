-- JOIN  TABLE AND FIND COLUMN AND THEY MUST HAVE FOREIGN KEY

SELECT * 
FROM allbitcoinlist
INNER JOIN favorite
ON favorite.bitcoinlist_id = allbitcoinlist.bitcoinlist_id
WHERE user_id = $1
