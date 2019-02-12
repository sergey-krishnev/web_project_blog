package hibernate.validation.annotations;

import hibernate.validation.annotationsImpl.BadWordsValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = BadWordsValidator.class)
public @interface BadWords {
    String message() default "BadWords-commentDTO-message";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
