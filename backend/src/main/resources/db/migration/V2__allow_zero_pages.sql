ALTER TABLE books
DROP CONSTRAINT chk_books_pages;

ALTER TABLE books
ADD CONSTRAINT chk_books_pages
CHECK (pages IS NULL OR pages >= 0);