package hibernate.annotationsImpl;

import hibernate.annotations.CapitalizeSubject;
import org.apache.commons.text.WordUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CapitalizeSubjectValidator implements ConstraintValidator<CapitalizeSubject, String> {

    @Override
    public void initialize(CapitalizeSubject capitalizeSubject) {

    }

    @Override
    public boolean isValid(String subject, ConstraintValidatorContext constraintValidatorContext) {
        return WordUtils.capitalize(subject).equals(subject);
    }
}
