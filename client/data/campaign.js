import axios from 'axios'
import fileHelper from './fileHelper'
import {get as getUser} from './user'

export function createCampaign(campaignObj) {
  return axios.post('/api-campaign/campaigns', campaignObj)
    .then(res => res.data.data);
}

export function updateCampaign(accessToken, campaignObj) {
  return axios.patch(`/api-campaign/campaigns/${campaignObj.campaignId}?token=${accessToken}`, campaignObj)
    .then(res => res.data.data);
}


export function getCampaign(accessToken) {

  return _getCampaign(`/api-campaign/campaigns/byToken/${accessToken}`)

}

export function getCampaignBySlug(slug, accessToken) {

  return _getCampaign(`/api-campaign/campaigns/bySlug/${slug}/minified?token=${accessToken}`)

}

const _getCampaign = (path) => {

  return axios.get(path)
    .then(res => res.data)
    .then(data => {//because sometimes there is a data property...
      if (data.data) return data.data;
      return data;
    })

}

export function addCampaignPhoto(accessToken, campaignId, file) {
  let path = `/api-campaign/campaigns/${campaignId}/uploadProfilePic?token=${accessToken}`;
  return fileHelper.upload(
    path,
    file,
    'image')
    .then(res => res.data)
}

export function deleteCampaignPhoto(accessToken, campaignId, profilePicId) {
  return axios.delete(`/api-campaign/campaigns/${campaignId}/profilePic/${profilePicId}?token=${accessToken}`)
    .then(res => res.data.data);
}
