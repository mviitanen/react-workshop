import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import 'YesterTech/Notice.scss'

const Notice: React.FC<NoticeProps> = ({ children, type = 'error' }) => {
  return <div className={classnames('notice', `notice-type-${type}`)}>{children}</div>
}

Notice.propTypes = {
  type: PropTypes.oneOf(['error', 'success']),
}

export default Notice

type NoticeProps = {
  type?: string
}
