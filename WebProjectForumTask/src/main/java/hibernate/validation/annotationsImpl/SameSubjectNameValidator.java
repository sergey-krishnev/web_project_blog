package hibernate.validation.annotationsImpl;

import hibernate.dto.SubjectDTO;
import hibernate.service.interfaces.BasicService;
import hibernate.service.interfaces.CRUDService;
import hibernate.validation.annotations.SameSubjectName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class SameSubjectNameValidator implements ConstraintValidator<SameSubjectName, String> {

    @Autowired
    @Qualifier("subjectService")
    private BasicService subjectService;

    @Override
    public void initialize(SameSubjectName sameSubjectName) {

    }

    @Override
    public boolean isValid(String subject, ConstraintValidatorContext constraintValidatorContext) {
        boolean exist = subjectService.getByName(subject);
        return !(exist);
    }
}
