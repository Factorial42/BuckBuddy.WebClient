import axios from 'axios'
import fileHelper from './fileHelper'
import {get as getUser} from './user'


export function getDonations(campaignSlug, pageNum, pageSize) {
  //Req: curl -i -XGET 'localhost:4569/donations/byCampaignSlug/testcampaign-1461734320?pageNumber=2&pageSize=4'
  return axios.get(`/api-donations/donations/byCampaignSlug/${campaignSlug}?pageNumber=${pageNum}&pageSize=${pageSize}`)
    .then(res => res.data)
}

export function donate(userSlug, campaignSlug, amountInCents, paymentToken, currencyString, firstName) {
  //Req: curl -i -XPOST 'localhost:4569/donations' -d '{"userSlug":"test-user-1461137856", "campaignSlug":"testcampaign-1461734320", "amountInCents":100, "paymentToken":"tok_184yPYHngV6Dzl2IwVR7ng1w","currencyString":"usd", "firstName":"testuser1"}'
  //
  return axios.post('/api-donations/donations', {
    userSlug,
    campaignSlug,
    amountInCents,
    paymentToken,
    currencyString,
    firstName
  })
}

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
