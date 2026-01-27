package com.greencart.admin.enums;

import lombok.Getter;

@Getter
public enum UserStatus {
    ACTIVE(1),
    PENDING(2),
    SUSPENDED(3);

    private final int code;

    UserStatus(int code) {
        this.code = code;
    }

    public static UserStatus fromCode(int code) {
        for (UserStatus status : UserStatus.values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        return PENDING;
    }
}
