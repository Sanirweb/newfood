package com.fooddelivery.shared;

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}
