package hibernate.validation.annotationsImpl;

import hibernate.service.interfaces.CRUDService;
import hibernate.validation.annotations.SameUserName;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SameUserNameValidator implements ConstraintValidator<SameUserName, String> {

    @Autowired
    private CRUDService crudService;

    @Override
    public void initialize(SameUserName sameSubjectName) {

    }

    @Override
    public boolean isValid(String userName, ConstraintValidatorContext constraintValidatorContext) {
        boolean exist = crudService.searchByUserName(userName);
        return !(exist);
    }
}
