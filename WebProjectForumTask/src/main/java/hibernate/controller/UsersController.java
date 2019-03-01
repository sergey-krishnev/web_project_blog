package hibernate.controller;

import hibernate.dto.UsersDTO;
import hibernate.service.interfaces.BasicService;
import hibernate.validation.ValidationErrorBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    @Qualifier("usersService")
    private BasicService usersService;

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public List<UsersDTO> getAllUsersDTO() { return usersService.getAll();
    }

    @RequestMapping(value = "/admin", params = {"search"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UsersDTO> getSearchedUsers(@RequestParam("search") String search) {
        return usersService.getLikeName(search);
    }


    @RequestMapping(value = "/{userId}/admin", method = RequestMethod.GET)
    public UsersDTO getUsersDTO(@PathVariable int userId) {
        return (UsersDTO) usersService.getById(userId);
    }

    @RequestMapping(value = "/admin", method = RequestMethod.POST)
    public ResponseEntity addUsersDTO(@Valid @RequestBody UsersDTO usersDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        usersService.add(usersDTO);
        return ResponseEntity.ok(usersDTO);
    }

    @RequestMapping(value = "/{userId}/admin", method = RequestMethod.PUT)
    public ResponseEntity updateUsersDTO(@Valid @RequestBody UsersDTO usersDTO, Errors errors, @PathVariable int userId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        usersService.update(userId, usersDTO);
        return ResponseEntity.ok(usersDTO);
    }

    @RequestMapping(value = "/{userId}/admin", method = RequestMethod.DELETE)
    public void deleteUsersDTO(@PathVariable int userId) {
        usersService.delete(userId);
    }

}
