import passwordGenerator from 'secure-random-string'

const createUser = ({ form, url, key }) => (
  fetch(`${url}?${Object.entries({
    accepted_gtc: true,
    accepted_privacy_policy: true,
    edgeryders_research_content: true,
    requested_api_keys: ['edgeryders.eu'],
    auth_key: key,
    ...generateForm(form)
  }).map(v => v.join('=')).join('&')}`, { mode: 'no-cors' })
)

const createTopic = ({ form, url, key }) => (
  fetch(url, {
    method: 'post',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Api-Key': key,
      'Api-Username': 'gdpelican', // TODO
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      title: `Rethinking retirement - response by ${formField(form, 'name')}`,
      category: 343, // TODO
      raw: formatResponse(form)
    })
  })
)

const generateForm = form => ({
  email: formField(form, 'email'),
  username: 'gdpelican_test', //TODO
  password: passwordGenerator({ length: 15 })
})

const formField = (form, field) => (
  Object.values(form).map(f => (f[field] || {}).value)
)

const formatResponse = form => (
  Object.values(form).map(({ body, ...fields }) => (
    [
      `**${body}**`,
      Object.entries(fields).map(([field, { value }]) => (
        `${field === 'message' ? '' : `**${field}:** `}${value}`
      )).join('\n')
    ]
  )).flat().join('\n\n')
)

export default ({ urls, keys }) => (
  form => (
    createUser({ form, url: urls.user, key: keys.user }).then(() => (
      createTopic({ form, url: urls.topic, key: keys.topic })
    ))
  )
)
