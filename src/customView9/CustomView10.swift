//
//  CustomView10.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView10: View {
    @State public var image9Path: String = "image9_1213704"
    @State public var text10Text: String = "Childcare"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image9Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .padding(EdgeInsets(top: 0, leading: 0, bottom: 7.368, trailing: 0.108))
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            Text(text10Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 3.216, y: 3.369)
        }
        .frame(width: 65.108, height: 29.368, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView10_Previews: PreviewProvider {
    static var previews: some View {
        CustomView10()
    }
}
