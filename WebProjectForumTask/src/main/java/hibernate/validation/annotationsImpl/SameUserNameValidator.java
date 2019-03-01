package hibernate.validation.annotationsImpl;

import hibernate.service.interfaces.BasicService;
import hibernate.service.interfaces.CRUDService;
import hibernate.validation.annotations.SameUserName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SameUserNameValidator implements ConstraintValidator<SameUserName, String> {

    @Autowired
    @Qualifier("usersService")
    private BasicService usersService;

    @Override
    public void initialize(SameUserName sameSubjectName) {

    }

    @Override
    public boolean isValid(String userName, ConstraintValidatorContext constraintValidatorContext) {
        boolean exist = usersService.getByName(userName);
        return !(exist);
    }
}
