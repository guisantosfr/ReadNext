package com.guisantosfr.readnext.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guisantosfr.readnext.dto.BookRequestDTO;
import com.guisantosfr.readnext.dto.BookResponseDTO;
import com.guisantosfr.readnext.exception.ResourceNotFoundException;
import com.guisantosfr.readnext.model.Book;
import com.guisantosfr.readnext.model.BookStatus;
import com.guisantosfr.readnext.repository.BookRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Transactional
    public BookResponseDTO create(BookRequestDTO request) {
        Book book = new Book();

        book.setTitle(request.title());
        book.setAuthor(request.author());
        book.setDescription(request.description());
        book.setCover(request.cover());
        book.setGenre(request.genre());
        book.setPages(request.pages());
        book.setStatus(request.status() != null ? request.status() : BookStatus.TO_READ);

        if (request.recommendedFromId() != null) {
            Book originBook = bookRepository.findById(request.recommendedFromId())
                    .orElseThrow(() -> new EntityNotFoundException("Livro de origem não encontrado"));
            book.setRecommendedFrom(originBook);
        }

        Book savedBook = bookRepository.save(book);

        return toResponse(savedBook);
    }

    @Transactional(readOnly = true)
    public List<BookResponseDTO> findAll() {
        return bookRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public BookResponseDTO findById(UUID id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Livro não encontrado"));

        return toResponse(book);
    }

    @Transactional(readOnly = true)
    public List<BookResponseDTO> findByStatus(BookStatus status) {
        if (status == null) {
            throw new IllegalArgumentException("Status não pode ser nulo");
        }

        return bookRepository.findByStatus(status).stream().map(this::toResponse).toList();
    }

    @Transactional
    public BookResponseDTO updateStatus(UUID id, BookStatus status) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Livro não encontrado"));

        book.setStatus(status);

        return toResponse(bookRepository.save(book));
    }

    @Transactional
    public void delete(UUID id) {
        if (!bookRepository.existsById(id)) {
            throw new ResourceNotFoundException("Livro não encontrado");
        }
        bookRepository.deleteById(id);
    }

    private BookResponseDTO toResponse(Book book) {
        return new BookResponseDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getDescription(),
                book.getCover(),
                book.getGenre(), book.getPages(), book.getStatus(),
                book.getRecommendedFrom() != null ? book.getRecommendedFrom().getId() : null, book.getCreatedAt(),
                book.getUpdatedAt());
    }

}
