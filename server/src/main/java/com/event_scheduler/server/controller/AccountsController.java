package com.event_scheduler.server.controller;

import com.event_scheduler.server.dto.AccountDto;
import com.event_scheduler.server.exceptions.LoginAlreadyExists;
import com.event_scheduler.server.exceptions.AccountNotFoundException;
import com.event_scheduler.server.model.Account;
import com.event_scheduler.server.service.AccountService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AccountsController {

    private final AccountService accountService;

    @GetMapping("/accounts")
    List<Account> getAccounts(){
        return accountService.getAccounts();
    }

    @GetMapping("/account/{id}")
    Account getAccount(@PathVariable Long id){
        return accountService.getAccount(id);
    }

    @DeleteMapping("/deleteAccount/{accountId}")
    void deleteAccount(@PathVariable Long accountId){
        accountService.deleteAccount(accountId);
    }

    @PostMapping("/sign_up")
    void singUp(@RequestBody AccountDto profileDto){
        accountService.signUp(profileDto);
    }

    @PutMapping("/editAccount/{accountId}")
    void editAccount(@PathVariable Long accountId, @RequestBody AccountDto profileDto) {
        accountService.editAccountName(accountId, profileDto);
    }

    @GetMapping("/isLoginExists/{accountId}/{login}")
    boolean isLoginExists(@PathVariable Long accountId, @PathVariable String login) {
        return accountService.isLoginExists(accountId, login);
    }

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity handleException(AccountNotFoundException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }

    @ExceptionHandler(LoginAlreadyExists.class)
    public ResponseEntity handleException(LoginAlreadyExists e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
}
