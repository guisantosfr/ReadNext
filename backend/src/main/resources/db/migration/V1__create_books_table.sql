CREATE TYPE book_status AS ENUM ( 'TO_READ', 'READING', 'READ', 'DROPPED' );

CREATE TABLE books (
    id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    cover VARCHAR(500),
    genre VARCHAR(100),
    pages INTEGER,
    status book_status NOT NULL DEFAULT 'TO_READ',
    recommended_from_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_books_recommended_from
        FOREIGN KEY (recommended_from_id)
        REFERENCES books(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_books_pages
        CHECK (pages IS NULL OR pages > 0)
);

CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_books_recommended_from ON books(recommended_from_id);