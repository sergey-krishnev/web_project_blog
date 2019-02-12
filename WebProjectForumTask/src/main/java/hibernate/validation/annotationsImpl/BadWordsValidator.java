package hibernate.validation.annotationsImpl;

import hibernate.validation.annotations.BadWords;
import hibernate.fileReader.ScvReader;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.io.IOException;
import java.util.List;

public class BadWordsValidator implements ConstraintValidator<BadWords, String> {

    @Override
    public void initialize(BadWords badWords) {

    }

    @Override
    public boolean isValid(String message, ConstraintValidatorContext constraintValidatorContext) {
        ScvReader scvReader = null;
        try {
            scvReader = new ScvReader("BadWords.csv");
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<String> badWords = scvReader.getBadWords();
        String lowerMessage = message.toLowerCase();
        for (String badWord : badWords) {
            if(lowerMessage.contains(badWord)) return false;
        }
        return true;
    }

}
