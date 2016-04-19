import axios from 'axios'
import fileHelper from './fileHelper'

export function createCampaign(campaignObj) {
  return axios.post('/api-campaign/campaigns', campaignObj)
    .then(res => res.data.data);
}

export function updateCampaign(accessToken, campaignObj) {
  return axios.put(`/api-campaign/campaigns/${campaignObj.campaignId}?token=${accessToken}`, campaignObj)
    .then(res => res.data.data);
}


export function getCampaign(accessToken) {

  return axios.get(`/api-campaign/campaigns/byToken/${accessToken}`)
    .then(res => res.data.data);
}


export function addCampaignPhoto(accessToken, campaignId, file) {

  let path = `/api-campaign/campaigns/${campaignId}/uploadProfilePic?token=${accessToken}`;
  return fileHelper.upload(
    path,
    file,
    'image')
    .then(res => res.data)

}