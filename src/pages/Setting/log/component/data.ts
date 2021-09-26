export const codeMap = {
    DELETE_EVENT_TYPE: "已清除的类型",

    CARD_CREATE: "新增任务节点",
    CARD_LOCK: "锁定任务节点",
    CARD_FINISH: "完成任务节点",
    CARD_OPEN: "任务节点解锁",
    CARD_UPDATE: "任务信息更新",
    CARD_UPDATE_NAME: "节点名称变更",
    CARD_DELETE: "删除节点",

    COMMENT_CREATE: "记录任务内容",
    COMMENT_UPDATE: "更新记录任务内容",
    COMMENT_DELETE: "删除记录任务内容",

    FILE_UPLOAD: "上传文件",
    FILE_DELETE: "删除文件",

    DESCRIPTION_UPDATE: "更新描述",

    PROJECT_BROWSE: "浏览所有项目",
    PROJECT_CREATE: "新增项目",
    PROJECT_UPDATE: "修改项目",

    USER_ROLE_ADD: "新增角色",
    USER_ROLE_MODIFY: "修改角色",
    USER_ROLE_DELETE: "删除角色",

    USER_LOGIN_FAIL_OPT: "用户登录失败操作",
    USER_ADD: "新增用户",
    USER_MODIFY_PASSWORD: "修改用户密码",
    USER_MODIFY_DETAIL: "修改用户",
    USER_DELETE: "删除用户",
    USER_ENABLE_FALSE: "锁定用户",
    USER_ENABLE_TRUE: "解锁用户",

    PROJECT_DELETE: "删除项目",
    PROJECT_MODIFY_PROGRESS: "修改项目进度",
    PROJECT_MARK_AS_FINISHED: "把项目标记为完成",
    PROJECT_STATE_CHANGE: "项目状态变更",

    PROJECT_USER_ADD: "新增项目用户",
    PROJECT_USER_REMOVE: "删除项目用户",
    PROJECT_ARCHIVE_DOWNLOAD: "项目归档库打包下载",
    PROJECT_FILE_IN_ARCHIVE: "从项目归档库下载",
    DAILY_REPORT_POST: "发布日报",
    WEEKLY_REPORT_POST: "发布周报",
    DAILY_REPORT_DELETE: "删除日报",
    WEEKLY_REPORT_DELETE: "删除周报",

    FILE_DOWNLOAD: "文件下载",
    TEMPLATE_DOWNLOAD: "模板下载",
    STAGE_FILE_UPLOAD: "上传阶段级文件",
    STAGE_FILE_DOWNLOAD: "下载阶段级文件",
    STAGE_FILE_DELETE: "删除阶段级文件",

    USER_ADD_APPLYING: "申请 新增用户",
    USER_ADD_REVOKED: "撤销 新增用户",
    USER_ADD_AGREED: "审批通过 新增用户",
    USER_ADD_REJECTED: "审批不通过 新增用户",

    USER_MODIFY_UPDATE_APPLYING: "申请 修改用户信息",
    USER_MODIFY_UPDATE_REVOKED: "撤销 修改用户信息",
    USER_MODIFY_UPDATE_AGREED: "审批通过 修改用户信息",
    USER_MODIFY_UPDATE_REJECTED: "审批不通过 修改用户信息",

    USER_MODIFY_PSW_APPLYING: "申请 修改用户密码",
    USER_MODIFY_PSW_REVOKED: "撤销 修改用户密码",
    USER_MODIFY_PSW_AGREED: "审批通过 修改用户密码",
    USER_MODIFY_PSW_REJECTED: "审批不通过 修改用户密码",

    USER_ENABLE_APPLYING: "申请 启停用户",
    USER_ENABLE_REVOKED: "撤销 启停用户",
    USER_ENABLE_AGREED: "审批通过 启停用户",
    USER_ENABLE_REJECTED: "审批不通过 启停用户",

    USER_ROLE_ADD_APPLYING: "申请 新增角色",
    USER_ROLE_ADD_REVOKED: "撤销 新增角色",
    USER_ROLE_ADD_AGREED: "审批通过 新增角色",
    USER_ROLE_ADD_REJECTED: "审批不通过 新增角色",

    ROLE_MODIFY_APPLYING: "申请 修改角色",
    ROLE_MODIFY_REVOKED: "撤销 修改角色",
    ROLE_MODIFY_AGREED: "审批通过 修改角色",
    ROLE_MODIFY_REJECTED: "审批不通过 修改角色",

    ROLE_DELETE_APPLYING: "申请 删除角色",
    ROLE_DELETE_REVOKED: "撤销 删除角色",
    ROLE_DELETE_AGREED: "审批通过 删除角色",
    ROLE_DELETE_REJECTED: "审批不通过 删除角色",

    STAGE_OPEN: "打开阶段",
    STAGE_FINISH: "完成阶段",
    STAGE_MODIFY_TODO_USER: "修改负责人",
    STAGE_UPDATE_NAME: "阶段任务名称变更",
    STAGE_UPDATE_PLAN_TIME: "阶段任务计划时间变更",
    STAGE_DELETE: "删除阶段任务",
    STAGE_STATE_CHANGE: "状态变更",

    QUOTA_UPDATE: "更新自定义指标",
    QUOTA_UPDATE_NAME: "指标名称变更",
    QUOTA_UPDATE_COMPLETE: "完成指标量变更",
    QUOTA_UPDATE_PLAN: "计划指标量变更",
    QUOTA_UPDATE_UNIT: "指标单位变更",
    QUOTA_DELETE: "删除自定义指标",

    CREATE_QUOTA: "创建自定义指标",
    CREATE_STAGE: "创建阶段任务",
    CREATE_GROUP: "创建阶段分组",

    TASK_STAGE_UPDATE_TODOUSER: "设置任务信息 负责人",
    TASK_STAGE_UPDATE_DESC: "设置任务信息 说明",
    TASK_STAGE_UPDATE_TITLE: "设置任务信息 标题",
    TASK_STAGE_UPDATE_PLAN_TIME: "设置任务信息 计划时间",
    TASK_STAGE_UPDATE_STARTTIME: "设置任务信息 开始时间",
    TASK_STAGE_UPDATE_DUETIME: "设置任务信息 截止时间",
    TASK_STAGE_UPDATE_MAKEKEY: "设置任务信息 设置关注",

    READ_NOTICE: "阅读通知",

    ASSET_DEVICE_INPUT: "系统录入",
    ASSET_MANUFACTURER_DELIVER: "厂商发货",
    ASSET_INTEGRATOR_SIGNED: "集成商签收",
    ASSET_INTEGRATOR_DELIVER: "集成商发货",
    ASSET_CONSUMER_SIGNED: "业主签收",
};

export const commentArr = ["COMMENT_CREATE", "COMMENT_UPDATE", "COMMENT_DELETE"];

export const projectArr = [
    "PROJECT_BROWSE",
    "PROJECT_CREATE",
    "PROJECT_UPDATE",
    "PROJECT_DELETE",
    "PROJECT_MODIFY_PROGRESS",
    "PROJECT_MARK_AS_FINISHED",
    "PROJECT_STATE_CHANGE",
    "PROJECT_USER_ADD",
    "PROJECT_USER_REMOVE",
    "PROJECT_ARCHIVE_DOWNLOAD",
    "PROJECT_FILE_IN_ARCHIVE",
];

export const userArr = [
    "USER_LOGIN_FAIL_OPT",
    "USER_ADD",
    "USER_MODIFY_PASSWORD",
    "USER_MODIFY_DETAIL",
    "USER_DELETE",
    "USER_ENABLE_FALSE",
    "USER_ENABLE_TRUE",
    "USER_ADD_APPLYING",
    "USER_ADD_REVOKED",
    "USER_ADD_AGREED",
    "USER_ADD_REJECTED",
    "USER_MODIFY_UPDATE_APPLYING",
    "USER_MODIFY_UPDATE_REVOKED",
    "USER_MODIFY_UPDATE_AGREED",
    "USER_MODIFY_UPDATE_REJECTED",
    "USER_MODIFY_PSW_APPLYING",
    "USER_MODIFY_PSW_REVOKED",
    "USER_MODIFY_PSW_AGREED",
    "USER_MODIFY_PSW_REJECTED",
    "USER_ENABLE_APPLYING",
    "USER_ENABLE_REVOKED",
    "USER_ENABLE_AGREED",
    "USER_ENABLE_REJECTED",
];

export const roleArr = [
    "USER_ROLE_ADD",
    "USER_ROLE_MODIFY",
    "USER_ROLE_DELETE",
    "USER_ROLE_ADD_APPLYING",
    "USER_ROLE_ADD_REVOKED",
    "USER_ROLE_ADD_AGREED",
    "USER_ROLE_ADD_REJECTED",
    "ROLE_MODIFY_APPLYING",
    "ROLE_MODIFY_REVOKED",
    "ROLE_MODIFY_AGREED",
    "ROLE_MODIFY_REJECTED",
    "ROLE_DELETE_APPLYING",
    "ROLE_DELETE_REVOKED",
    "ROLE_DELETE_AGREED",
    "ROLE_DELETE_REJECTED",
];

export const detailArr = [...commentArr, ...projectArr, ...userArr, ...roleArr];
