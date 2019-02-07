package hibernate.annotations;

import hibernate.annotationsImpl.CapitalizeMessageValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CapitalizeMessageValidator.class)
public @interface CapitalizeMessage {
    String message() default "CapitalizeMessage-subjectDTO-message";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
