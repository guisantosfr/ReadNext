package com.guisantosfr.readnext.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.guisantosfr.readnext.model.Book;
import com.guisantosfr.readnext.model.BookStatus;

public interface BookRepository extends JpaRepository<Book, UUID> {
    List<Book> findByStatus(BookStatus status);

    // Carrega o relacionamento lazy evitando o problema N+1 ao listar
    @Query("SELECT b FROM Book b LEFT JOIN FETCH b.recommendedFrom")
    List<Book> findAllRecommendations();

    List<Book> findByRecommendedFrom(UUID bookId);
}
