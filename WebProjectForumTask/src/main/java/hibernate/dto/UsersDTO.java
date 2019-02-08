package hibernate.dto;

import hibernate.annotations.BadWords;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

public class UsersDTO {

    private int id;
    @BadWords(message = "BadWords-userDTO-userName")
    @NotEmpty(message = "NotEmpty-commentDTO-userName")
    private String userName;
    @NotEmpty(message = "NotEmpty-userDTO-password")
    private String password;
    @NotEmpty(message = "NotEmpty-userDTO-email")
    @Email(message = "Email-userDTO-email")
    private String email;
    @NotEmpty(message = "NotEmpty-userDTO-firstName")
    @BadWords(message = "BadWords-userDTO-firstName")
    private String firstName;
    @NotEmpty(message = "NotEmpty-userDTO-lastName")
    @BadWords(message = "BadWords-userDTO-lastName")
    private String lastName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
