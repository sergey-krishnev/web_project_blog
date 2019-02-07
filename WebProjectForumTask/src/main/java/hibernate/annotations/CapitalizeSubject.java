package hibernate.annotations;

import hibernate.annotationsImpl.CapitalizeSubjectValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CapitalizeSubjectValidator.class)
public @interface CapitalizeSubject {
    String message() default "CapitalizeSubject-subjectDTO-subject";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
