package hibernate.annotationsImpl;

import hibernate.annotations.CapitalizeMessage;
import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CapitalizeMessageValidator implements ConstraintValidator<CapitalizeMessage, String> {

    @Override
    public void initialize(CapitalizeMessage capitalizeMessage) {

    }

    @Override
    public boolean isValid(String message, ConstraintValidatorContext constraintValidatorContext) {
        return StringUtils.capitalize(message).equals(message);
    }
}
