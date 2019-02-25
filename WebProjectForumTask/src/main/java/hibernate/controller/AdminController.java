package hibernate.controller;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.dto.UsersDTO;
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
    private CRUDService crudService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/comments", method = RequestMethod.GET)
    public List<CommentDTO> getAllCommentDTO() {
        return crudService.searchAllComment();
    }

    @RequestMapping(value = "/comments",params = {"page", "size"}, method = RequestMethod.GET)
    @ResponseBody
    public List<CommentDTO> getAllCommentDTO(@RequestParam("page") int page, @RequestParam("size") int size) {
        if (page > 0 && size > 0) {
            return crudService.searchAllCommentPaginated(page, size);
        }
        return crudService.searchAllComment();
    }

    @RequestMapping(value = "/comments", params = {"search", "page", "size"}, method = RequestMethod.GET)
    @ResponseBody
    public List<CommentDTO> getSearchedComments(@RequestParam("search") String search, @RequestParam("page") int page, @RequestParam("size") int size) {
        if (page > 0 && size > 0) {
            return crudService.searchLikeCommentPaginated(page, size, search);
        }
            return crudService.searchLikeComment(search);
    }

    @RequestMapping(value = "/comments/{commentId}", method = RequestMethod.GET)
    public CommentDTO getCommentDTO(@PathVariable int commentId) {
        return crudService.searchCommentById(commentId);
    }

    @RequestMapping(value = "/comments", method = RequestMethod.POST)
    public ResponseEntity addCommentDTO(@Valid @RequestBody CommentDTO commentDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.insertComment(commentDTO);
        return ResponseEntity.ok(commentDTO);
    }

    @RequestMapping(value = "/comments/{commentId}", method = RequestMethod.PUT)
    public ResponseEntity updateCommentDTO(@Valid @RequestBody CommentDTO commentDTO, Errors errors, @PathVariable int commentId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.updateComment(commentId, commentDTO);
        return ResponseEntity.ok(commentDTO);
    }

    @RequestMapping(value = "/comments/{commentId}", method = RequestMethod.DELETE)
    public void deleteCommentDTO(@PathVariable int commentId) {
        crudService.deleteComment(commentId);
    }

    @RequestMapping(value = "/subjects", method = RequestMethod.GET)
    public List<SubjectDTO> getAllSubjectDTO() {
        return crudService.searchAllSubject();
    }

    @RequestMapping(value = "/subjects",params = {"page", "size"}, method = RequestMethod.GET)
    @ResponseBody
    public List<SubjectDTO> getAllSubjectDTO(@RequestParam("page") int page, @RequestParam("size") int size) {
        if (page > 0 && size > 0) {
            return crudService.searchAllSubjectPaginated(page, size);
        }
        return crudService.searchAllSubject();
    }

    @RequestMapping(value = "/subjects", params = {"search", "page", "size"}, method = RequestMethod.GET)
    @ResponseBody
    public List<SubjectDTO> getSearchedSubjects(@RequestParam("search") String search, @RequestParam("page") int page, @RequestParam("size") int size) {
        if (page > 0 && size > 0) {
            return crudService.searchLikeSubjectNamePaginated(page, size, search);
        }
        return crudService.searchLikeSubjectName(search);
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.GET)
    public SubjectDTO getSubjectDTO(@PathVariable int subjectId) {
        return crudService.searchSubjectById(subjectId);
    }

    @RequestMapping(value = "/subjects", method = RequestMethod.POST)
    public ResponseEntity addSubjectDTO(@Valid @RequestBody SubjectDTO subjectDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.insertSubject(subjectDTO);
        return ResponseEntity.ok(subjectDTO);
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.PUT)
    public ResponseEntity updateSubjectDTO(@Valid @RequestBody SubjectDTO subjectDTO, Errors errors, @PathVariable int subjectId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.updateSubject(subjectId, subjectDTO);
        return ResponseEntity.ok(subjectDTO);
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.DELETE)
    public void deleteSubjectDTO(@PathVariable int subjectId) {
        crudService.deleteSubject(subjectId);
    }

    @RequestMapping(value = "/topics",method = RequestMethod.GET)
    public List<TopicDTO> getTopicsDTO() {
        return crudService.searchAllTopic();
    }

    @RequestMapping(value = "/topics", params = {"page", "size"},method = RequestMethod.GET)
    @ResponseBody
    public List<TopicDTO> getTopicsDTO(@RequestParam("page") int page, @RequestParam("size") int size) {
        if (page > 0 && size > 0) {
            return crudService.searchAllTopicPaginated(page, size);
        }
        return crudService.searchAllTopic();
    }

    @RequestMapping(value = "/topics", params = {"search", "page", "size"}, method = RequestMethod.GET)
    @ResponseBody
    public List<TopicDTO> getSearchedTopics(@RequestParam("search") String search, @RequestParam("page") int page, @RequestParam("size") int size) {
        if (page > 0 && size > 0) {
            return crudService.searchLikeTopicPaginated(page, size, search);
        }
        return crudService.searchLikeTopicName(search);
    }

    @RequestMapping(value = "/topics/{topicId}", method = RequestMethod.GET)
    public TopicDTO getTopicDTO(@PathVariable int topicId) {
        return crudService.searchTopicById(topicId);
    }

    @RequestMapping(value = "/topics", method = RequestMethod.POST)
    public ResponseEntity addTopicDTO(@Valid @RequestBody TopicDTO topicDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.insertTopic(topicDTO);
        return ResponseEntity.ok(topicDTO);
    }

    @RequestMapping(value = "/topics/{topicId}", method = RequestMethod.PUT)
    public ResponseEntity updateTopicDTO(@Valid @RequestBody TopicDTO topicDTO, Errors errors, @PathVariable int topicId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.updateTopic(topicId,topicDTO);
        return ResponseEntity.ok(topicDTO);
    }

    @RequestMapping(value = "/topics/{topicId}", method = RequestMethod.DELETE)
    public void deleteTopicDTO(@PathVariable int topicId) {
        crudService.deleteTopic(topicId);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<UsersDTO> getAllUsersDTO() { return crudService.searchAllUsers();
    }

    @RequestMapping(value = "/users", params = {"page", "size"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UsersDTO> getAllUsersDTO(@RequestParam("page") int page, @RequestParam("size") int size) {
        if (page > 0 && size > 0) {
            return crudService.searchAllUsersPaginated(page, size);
        }
        return crudService.searchAllUsers();
    }

    @RequestMapping(value = "/users", params = {"search", "page", "size"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UsersDTO> getSearchedUsers(@RequestParam("search") String search, @RequestParam("page") int page, @RequestParam("size") int size) {
        if (page > 0 && size > 0) {
            return crudService.searchLikeUserPaginated(page, size, search);
        }
        return crudService.searchLikeUserName(search);
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.GET)
    public UsersDTO getUsersDTO(@PathVariable int userId) {
        return crudService.searchUserById(userId);
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity addUsersDTO(@Valid @RequestBody UsersDTO usersDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.insertUsers(usersDTO);
        return ResponseEntity.ok(usersDTO);
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.PUT)
    public ResponseEntity updateUsersDTO(@Valid @RequestBody UsersDTO usersDTO, Errors errors, @PathVariable int userId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.updateUsers(userId, usersDTO);
        return ResponseEntity.ok(usersDTO);
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.DELETE)
    public void deleteUsersDTO(@PathVariable int userId) {
        crudService.deleteUsers(userId);
    }

}
