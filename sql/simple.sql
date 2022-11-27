-- show databases;
-- use mybloog;

-- insert into users(username, `password`, realname) values('zhangsan', '123', '张三');
-- insert into users(username, `password`, realname) values('lisi', '123', '李四');

-- select * from users;
-- select username, password from users;

-- select * from users where username='zhangsan' or `password`='123';

-- select * from users where username like '%zhang%';

-- select * from users where id != 4;blogs

-- update users set password='123', realname='李四'  where id=3;

-- delete from users where id = 2;

 
-- insert into blogs(title, content, createtime, author) values('标题A', '内容A', 1669531688288, 'zhangsan');

-- insert into blogs(title, content, createtime, author) values('标题B', '内容B', 1669531832631, 'lisi');

-- mysql版本
select version()