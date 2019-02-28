package hibernate.controller;

import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.service.interfaces.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/blog")
public class HomeController {

    @Autowired
    private CRUDService crudService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public String homeAll(@RequestParam(value = "page", defaultValue = "1") int page,
                       @RequestParam(value = "size", defaultValue = "3") int size,
                       @RequestParam(value = "search", defaultValue = "") String search, Model model) {
        List<SubjectDTO> subjects = crudService.searchAllSubjectPaginated(page,size);
        for (SubjectDTO subjectDTO : subjects) {
            subjectDTO.setText(subjectDTO.getText().split("\\.")[0] + ".");
        }
        int length = crudService.searchAllSubject().size();
        model.addAttribute("title","All Subjects");
        model.addAttribute("subjects", subjects);
        model.addAttribute("lengthSubjects",length);
        return "home";
    }

    @RequestMapping(value = "/{topicId}", method = RequestMethod.GET)
    public String homeById(@PathVariable int topicId, @RequestParam(value = "page", defaultValue = "1") int page,
                           @RequestParam(value = "size", defaultValue = "3") int size,
                           @RequestParam(value = "search", defaultValue = "") String search, Model model) {
        List<SubjectDTO> subjects = crudService.searchSubjectByTopicPaginated(topicId,page,size);
        for (SubjectDTO subjectDTO : subjects) {
            subjectDTO.setText(subjectDTO.getText().split("\\.")[0] + ".");
        }
        TopicDTO topicDTO = crudService.searchTopicById(topicId);
        int length = topicDTO.getSubjects().size();
        String title = topicDTO.getTopicName();
        model.addAttribute("title",title);
        model.addAttribute("subjects", subjects);
        model.addAttribute("lengthSubjects",length);
        return "home";
    }

}
