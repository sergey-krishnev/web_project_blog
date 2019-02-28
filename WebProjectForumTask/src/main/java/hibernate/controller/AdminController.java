package hibernate.controller;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.dto.UsersDTO;
import hibernate.service.implementations.CommentServiceImpl;
import hibernate.service.implementations.SubjectServiceImpl;
import hibernate.service.implementations.TopicServiceImpl;
import hibernate.service.implementations.UsersServiceImpl;
import hibernate.service.interfaces.CRUDService;
import hibernate.validation.ValidationErrorBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private CommentServiceImpl commentService;

    @Autowired
    private SubjectServiceImpl subjectService;

    @Autowired
    private UsersServiceImpl usersService;

    @Autowired
    private TopicServiceImpl topicService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/comments", method = RequestMethod.GET)
    public List<CommentDTO> getAllCommentDTO() {
        return commentService.getAll();
    }

    @RequestMapping(value = "/comments", params = {"search"}, method = RequestMethod.GET)
    @ResponseBody
    public List<CommentDTO> getSearchedComments(@RequestParam("search") String search) {
            return commentService.getLikeName(search);
    }

    @RequestMapping(value = "/comments/{commentId}", method = RequestMethod.GET)
    public CommentDTO getCommentDTO(@PathVariable int commentId) {
        return commentService.getById(commentId);
    }

    @RequestMapping(value = "/comments", method = RequestMethod.POST)
    public ResponseEntity addCommentDTO(@Valid @RequestBody CommentDTO commentDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        commentService.add(commentDTO);
        return ResponseEntity.ok(commentDTO);
    }

    @RequestMapping(value = "/comments/{commentId}", method = RequestMethod.PUT)
    public ResponseEntity updateCommentDTO(@Valid @RequestBody CommentDTO commentDTO, Errors errors, @PathVariable int commentId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        commentService.update(commentId, commentDTO);
        return ResponseEntity.ok(commentDTO);
    }

    @RequestMapping(value = "/comments/{commentId}", method = RequestMethod.DELETE)
    public void deleteCommentDTO(@PathVariable int commentId) {
        commentService.delete(commentId);
    }

    @RequestMapping(value = "/subjects", method = RequestMethod.GET)
    public List<SubjectDTO> getAllSubjectDTO() {
        return subjectService.getAll();
    }

    @RequestMapping(value = "/subjects", params = {"search"}, method = RequestMethod.GET)
    @ResponseBody
    public List<SubjectDTO> getSearchedSubjects(@RequestParam("search") String search) {
    return subjectService.getLikeName(search);
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.GET)
    public SubjectDTO getSubjectDTO(@PathVariable int subjectId) {
        return subjectService.getById(subjectId);
    }

    @RequestMapping(value = "/subjects", method = RequestMethod.POST)
    public ResponseEntity addSubjectDTO(@Valid @RequestBody SubjectDTO subjectDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        subjectService.add(subjectDTO);
        return ResponseEntity.ok(subjectDTO);
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.PUT)
    public ResponseEntity updateSubjectDTO(@Valid @RequestBody SubjectDTO subjectDTO, Errors errors, @PathVariable int subjectId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        subjectService.update(subjectId, subjectDTO);
        return ResponseEntity.ok(subjectDTO);
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.DELETE)
    public void deleteSubjectDTO(@PathVariable int subjectId) {
        subjectService.delete(subjectId);
    }

    @RequestMapping(value = "/topics",method = RequestMethod.GET)
    public List<TopicDTO> getTopicsDTO() {
        return topicService.getAll();
    }

    @RequestMapping(value = "/topics", params = {"search"}, method = RequestMethod.GET)
    @ResponseBody
    public List<TopicDTO> getSearchedTopics(@RequestParam("search") String search) {
        return topicService.getLikeName(search);
    }

    @RequestMapping(value = "/topics/{topicId}", method = RequestMethod.GET)
    public TopicDTO getTopicDTO(@PathVariable int topicId) {
        return topicService.getById(topicId);
    }

    @RequestMapping(value = "/topics", method = RequestMethod.POST)
    public ResponseEntity addTopicDTO(@Valid @RequestBody TopicDTO topicDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        topicService.add(topicDTO);
        return ResponseEntity.ok(topicDTO);
    }

    @RequestMapping(value = "/topics/{topicId}", method = RequestMethod.PUT)
    public ResponseEntity updateTopicDTO(@Valid @RequestBody TopicDTO topicDTO, Errors errors, @PathVariable int topicId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        topicService.update(topicId,topicDTO);
        return ResponseEntity.ok(topicDTO);
    }

    @RequestMapping(value = "/topics/{topicId}", method = RequestMethod.DELETE)
    public void deleteTopicDTO(@PathVariable int topicId) {
        topicService.delete(topicId);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<UsersDTO> getAllUsersDTO() { return usersService.getAll();
    }

    @RequestMapping(value = "/users", params = {"search"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UsersDTO> getSearchedUsers(@RequestParam("search") String search) {
        return usersService.getLikeName(search);
    }


    @RequestMapping(value = "/users/{userId}", method = RequestMethod.GET)
    public UsersDTO getUsersDTO(@PathVariable int userId) {
        return usersService.getById(userId);
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity addUsersDTO(@Valid @RequestBody UsersDTO usersDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        usersService.add(usersDTO);
        return ResponseEntity.ok(usersDTO);
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.PUT)
    public ResponseEntity updateUsersDTO(@Valid @RequestBody UsersDTO usersDTO, Errors errors, @PathVariable int userId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        usersService.update(userId, usersDTO);
        return ResponseEntity.ok(usersDTO);
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.DELETE)
    public void deleteUsersDTO(@PathVariable int userId) {
        usersService.delete(userId);
    }

}
