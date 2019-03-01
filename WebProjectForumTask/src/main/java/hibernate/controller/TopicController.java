package hibernate.controller;

import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.service.interfaces.BasicService;
import hibernate.validation.ValidationErrorBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/topics")
public class TopicController {

    @Autowired
    @Qualifier("topicService")
    private BasicService topicService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<TopicDTO> getAllTopicsDTO() {
        return topicService.getAll();
    }

    @RequestMapping(value = "/{topicId}/admin", method = RequestMethod.GET)
    public TopicDTO getTopicId(@PathVariable int topicId) {
        return (TopicDTO) topicService.getById(topicId);
    }

    @RequestMapping(value = "", params = {"search"}, method = RequestMethod.GET)
    @ResponseBody
    public List<TopicDTO> getSearchedTopics(@RequestParam("search") String search) {
        return topicService.getLikeName(search);
    }

    @RequestMapping(value = "/{topicId}/subjects", method = RequestMethod.GET)
    public List<SubjectDTO> getSubjectsByTopicId(@PathVariable int topicId) {
        TopicDTO topicDTO = (TopicDTO) topicService.getById(topicId);
        return topicDTO.getSubjects();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity addTopicDTO(@Valid @RequestBody TopicDTO topicDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        topicService.add(topicDTO);
        return ResponseEntity.ok(topicDTO);
    }

    @RequestMapping(value = "/{topicId}/admin", method = RequestMethod.PUT)
    public ResponseEntity updateTopicDTO(@Valid @RequestBody TopicDTO topicDTO, Errors errors, @PathVariable int topicId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        topicService.update(topicId,topicDTO);
        return ResponseEntity.ok(topicDTO);
    }

    @RequestMapping(value = "/{topicId}/admin", method = RequestMethod.DELETE)
    public void deleteTopicDTO(@PathVariable int topicId) {
        topicService.delete(topicId);
    }

}
