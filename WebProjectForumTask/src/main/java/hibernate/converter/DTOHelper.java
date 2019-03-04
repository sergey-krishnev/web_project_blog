package hibernate.converter;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.dto.UsersDTO;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.model.Users;

import java.util.ArrayList;
import java.util.List;

public class DTOHelper {

    public static void commentToCommentDTO(List<Comment> commentList, List<CommentDTO> comments) {
        for (Comment comment : commentList) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(comment.getId());
            commentDTO.setUserName(comment.getUsers().getNickname());
            commentDTO.setSubjectName(comment.getSubject().getName());
            commentDTO.setTopicName(comment.getSubject().getTopic().getName());
            commentDTO.setMessage(comment.getMessage());
            commentDTO.setDate(comment.getFormattedDateSending());
            comments.add(commentDTO);
        }
    }

    public static void subjectToSubjectDTO(List<Subject> subjects, List<SubjectDTO> subjectDTOList) {
        for (Subject subject : subjects) {
            SubjectDTO subjectDTO = new SubjectDTO();
            List<Comment> commentList = subject.getComments();
            List<CommentDTO> comments = new ArrayList<>();
            commentToCommentDTO(commentList,comments);
            subjectDTO.setId(subject.getId());
            subjectDTO.setUserName(subject.getUsers().getNickname());
            subjectDTO.setSubjectName(subject.getName());
            subjectDTO.setTopicName(subject.getTopic().getName());
            subjectDTO.setDate(subject.getFormattedDateSending());
            subjectDTO.setText(subject.getText());
            subjectDTO.setComments(comments);
            subjectDTOList.add(subjectDTO);
        }
    }

    public static void userToUserDTO(List<Users> usersList, List<UsersDTO> users) {
        for (Users user : usersList) {
            UsersDTO usersDTO = new UsersDTO();
            usersDTO.setId(user.getId());
            usersDTO.setUserName(user.getNickname());
            usersDTO.setPassword(user.getPassword());
            usersDTO.setEmail(user.getEmail());
            usersDTO.setFirstName(user.getFirstName());
            usersDTO.setLastName(user.getLastName());
            users.add(usersDTO);
        }
    }

    public static void topicToTopicDTO(List<Topic> topicList, List<TopicDTO> topics) {
        for (Topic topic : topicList) {
            TopicDTO topicDTO = new TopicDTO();
            List<Subject> subjectList = topic.getSubjects();
            List<SubjectDTO> subjects = new ArrayList<>();
            subjectToSubjectDTO(subjectList,subjects);
            topicDTO.setId(topic.getId());
            topicDTO.setTopicName(topic.getName());
            topicDTO.setSubjects(subjects);
            topics.add(topicDTO);
        }
    }

}
