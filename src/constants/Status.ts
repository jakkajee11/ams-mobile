export const JOB_STATUS = {
  Pending: 0,
  InProgress: 2,
  Finished: 3,
  Completed: 4,
  InCompleted: 8,
  Cancelled: 16,
};

export const JOB_PROGRESS = {
  Pending: 0,
  Started: 1,
  Paused: 3,
  Finished: 5,
};

export const JOB_ASSET_STATUS = {
  NotCheck: 0,
  Checked: 1,
  WrongShipTo: 2,
  NotFound: 3,
};

export const ATTACHMENT_TYPE = {
  Photo: 0,
  Pdf: 1,
  Other: 2,
};
