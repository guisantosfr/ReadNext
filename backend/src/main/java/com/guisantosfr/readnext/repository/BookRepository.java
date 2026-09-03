package com.guisantosfr.readnext.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guisantosfr.readnext.model.Book;
import com.guisantosfr.readnext.model.BookStatus;

public interface BookRepository extends JpaRepository<Book, UUID> {
    List<Book> findByStatus(BookStatus status);

    List<Book> findByRecommendation(UUID bookId);
}
