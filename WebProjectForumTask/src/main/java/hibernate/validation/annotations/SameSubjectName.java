package hibernate.validation.annotations;

import hibernate.validation.annotationsImpl.SameSubjectNameValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SameSubjectNameValidator.class)
public @interface SameSubjectName {
    String message() default "SameSubjectName-subjectDTO-subject";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
