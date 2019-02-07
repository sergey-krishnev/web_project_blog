package hibernate.annotationsImpl;

import hibernate.annotations.BadWords;
import hibernate.fileReader.ScvReader;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class BadWordsValidator implements ConstraintValidator<BadWords, String> {

    @Override
    public void initialize(BadWords badWords) {

    }

    @Override
    public boolean isValid(String message, ConstraintValidatorContext constraintValidatorContext) {
        ScvReader scvReader = new ScvReader("BadWords.csv");
        List<String> badWords = scvReader.getBadWords();
        String lowerMessage = message.toLowerCase();
        for (String badWord : badWords) {
            if(lowerMessage.contains(badWord)) return false;
        }
        return true;
    }

}
