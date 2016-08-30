CREATE TABLE `net_stream`.`project_list` (
  `user_id` INTEGER UNSIGNED NOT NULL DEFAULT 0 COMMENT 'user 登入id',
  `project_sn` INTEGER UNSIGNED NOT NULL DEFAULT 0 COMMENT 'project 序號'
)
ENGINE = InnoDB;

CREATE TABLE `net_stream`.`project_content` (
  `project_sn` INTEGER UNSIGNED NOT NULL DEFAULT 0 COMMENT 'project 序號',
  `importlog_sn` INTEGER UNSIGNED NOT NULL DEFAULT 0 COMMENT 'importlog序號'
)
ENGINE = InnoDB;